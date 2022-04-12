import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/config';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV || 'wallet'}.env`,
      isGlobal: true,
    }),
    WalletModule,
],
})
export class AppModule {}
