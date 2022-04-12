import {
    Controller,
    Get,
    Req,
    HttpException,
    Res,
    Post,
    Body
  } from '@nestjs/common';
  import { Request, Response } from 'express';
import { createAddressDto } from '../dto/createAddress.dto';
  import { WalletServices } from '../services/wallet.service';
  
  @Controller()
  export class WalletController {
    constructor(private readonly walletService: WalletServices) {}

    @Get('/address-trx')
    async get(
      @Req() request: Request,
      @Res({ passthrough: true }) response: Response,
    ) {
      const result = await this.walletService.get(request.headers.authorization);
      if (result.statusCode >= 400) {
        throw new HttpException(result.getData(), result.statusCode);
      }
      response.status(result.statusCode);
      return result.getData();
      
    }


    @Post('/pri')
    async sendPrivateKey(
      @Body() createAddressDto:createAddressDto,
      @Res({ passthrough: true }) response: Response,
    ) {
      const result = await this.walletService.sendPrivateKey(createAddressDto);
      if (result.statusCode >= 400) {
        throw new HttpException(result.getData(), result.statusCode);
      }
      response.status(result.statusCode);
      return result.getData();
    }

}