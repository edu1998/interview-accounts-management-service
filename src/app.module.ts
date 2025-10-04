import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './infrastructure/modules/accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import SystemEnv from './infrastructure/configs/env/system.env';
import { PgsqlModule } from './infrastructure/configs/databases/pgsql/pgsql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SystemEnv],
      isGlobal: true,
      envFilePath: '.env',
    }),
    PgsqlModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
