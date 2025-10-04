import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountTypeormRepository } from './repositories/account-typeorm.repository';
import { AccountRepository } from '../../../domain/repositories/account.repository';
import { AccountTypeormEntity } from './entities/account-typeorm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccountTypeormEntity])],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    { provide: AccountRepository, useClass: AccountTypeormRepository },
  ],
  exports: [AccountRepository],
})
export class AccountsModule {}
