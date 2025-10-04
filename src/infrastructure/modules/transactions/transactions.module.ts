import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { TransactionTypeormRepository } from './repositories/transaction-typeorm.repository';
import { AccountsModule } from '../accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeormEntity } from './entities/transaction-typeorm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionTypeormEntity]),
    AccountsModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: TransactionRepository,
      useClass: TransactionTypeormRepository,
    },
  ],
})
export class TransactionsModule {}
