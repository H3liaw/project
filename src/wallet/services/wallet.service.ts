import { HttpStatus, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { HttpService } from 'nestjs-http-promise';
import { userInfo } from 'os';
import { ErrorCode } from 'src/base/constants';
import { BusinessService } from '../../base/business.service';
import { createAddressDto } from '../dto/createAddress.dto';
import { ResponseErrorDto } from '../dto/error-response.dto';
import { SuccessResponseDto } from '../dto/success-response.dto';
import { Wallet } from '../entities/wallet.entity';
import { WalletRepository } from '../repositories/wallet.repository';
const hdAddress = require('hd-address');
const tronWeb = require('tronweb');
const arrayBufferToHex = require('array-buffer-to-hex');

@Injectable()
export class WalletServices extends BusinessService<Wallet> {
  constructor(
    private http: HttpService,
    private readonly walletRepository: WalletRepository,
  ) {
    super(walletRepository);
  }

  async get(token) {
    if (token === undefined || token.split(' ').length !== 2) {
      return new ResponseErrorDto(ErrorCode.AVOID, HttpStatus.FORBIDDEN);
    }
    const bearerToken = token.split(' ')[1];

    let decode = undefined;
    try {
      decode = verify(bearerToken, process.env.PUB_KEY, {
        algorithms: ['ES256'],
      });
    } catch (e) {
      return new ResponseErrorDto(
        ErrorCode.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user_ID = decode.user_id;

    try {
      const masterSeedToJson = Buffer.from(JSON.parse(process.env.MASTER_SEED));

      const hdWallet = await new hdAddress.seed(masterSeedToJson);
      // console.log("1-------------------------------------",hdWallet);
      

      const path = await hdWallet.getHdPath(195, 0,user_ID,0);

      console.log("2-------------------------------------",path);

      const chainCode = hdWallet.getChainCodeByPath(path);

      console.log("3-------------------------------------",chainCode);

      const hd = await hdAddress.HD(masterSeedToJson, hdAddress.keyType.seed);

      const pd= hd.TRX.getAddress(0,0,0)

      console.log("4-------------------------------------",pd);

        const result = hdWallet.getPrivateKeyByChainCode(
        chainCode.pri,
        chainCode.chainCode,
        path,
      );

      console.log("5-------------------------------------",result);

      let childAaddr = hd.TRX.getAddressByPrivateKey(result.pri);

      let childAaddr2 = hd.TRX.getAddressByPublicKey(result.pub);

      console.log("5/5-------------------------------------",childAaddr2);
      console.log("6-------------------------------------",childAaddr);

      const is_valid_address = await tronWeb.isAddress(childAaddr.address);

      console.log('Is_address_valid :', is_valid_address);

      const address = await this.walletRepository.findUserById(decode.user_id);

      if (address) {
        return new SuccessResponseDto(address);
      }

      if (is_valid_address === true) {
        const newUser = await this.save({
          path: path,
          address: childAaddr.address,
          userID: decode.user_id,
        });

        return new SuccessResponseDto(newUser);
      }
    } catch (e) {
      console.log(e);
      
      return new ResponseErrorDto(ErrorCode.AVOID, HttpStatus.BAD_REQUEST);
    }
  
    
  }

  async sendPrivateKey(createAddress: createAddressDto) {
    try {
      const wallet = await this.walletRepository.findUserById(
        createAddress.user_id,
      );

      if (!wallet) {
        return new ResponseErrorDto(ErrorCode.NOT_EXIST, HttpStatus.NOT_FOUND);
      }

      const masterSeedToJson = Buffer.from(JSON.parse(process.env.MASTER_SEED));

      const hdWallet = await new hdAddress.seed(masterSeedToJson);

      const path = await hdWallet.getHdPath(195, createAddress.user_id, 0);

      const chainCode = hdWallet.getChainCodeByPath(path);

      const private_K = Buffer.from(JSON.parse(process.env.MASTER_PRI));

      const getPri = hdWallet.getPrivateKeyByChainCode(
        private_K,
        chainCode.chainCode,
        path,
      );

      const key = arrayBufferToHex(getPri.pri);
      console.log(getPri.pri);
      

      return new SuccessResponseDto(key);
    } catch (e) {
      console.log(e);

      return new ResponseErrorDto(
        ErrorCode.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
