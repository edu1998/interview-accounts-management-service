import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './infrastructure/modules/accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import SystemEnv from './infrastructure/configs/env/system.env';
import { PgsqlModule } from './infrastructure/configs/databases/pgsql/pgsql.module';
import { TransactionsModule } from './infrastructure/modules/transactions/transactions.module';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SystemEnv],
      isGlobal: true,
      envFilePath: '.env',
    }),
    PgsqlModule,
    AuthModule,
    AccountsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
