import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from 'nestjs-http-promise';
import { WalletController } from './controllers/wallet.controller';
import { WalletRepository } from './repositories/wallet.repository';
import { WalletServices } from './services/wallet.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([WalletRepository]),
        HttpModule,
  ],
  controllers: [WalletController],
  providers: [WalletServices]
})
export class WalletModule {}
