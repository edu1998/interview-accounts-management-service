import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../../application/dto/create-transaction.dto';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { AccountRepository } from '../../../domain/repositories/account.repository';
import { CreateTransactionUseCase } from '../../../application/use-cases/create-transaction.usecase';
import { GetTransactionsByAccountUseCase } from '../../../application/use-cases/get-transactions-by-account.usecase';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}
  create(createTransactionDto: CreateTransactionDto) {
    const useCase = new CreateTransactionUseCase(
      this.transactionRepository,
      this.accountRepository,
    );
    return useCase.execute(createTransactionDto);
  }

  findAllByAccountId(accountId: string) {
    const useCase = new GetTransactionsByAccountUseCase(
      this.transactionRepository,
    );
    return useCase.execute(accountId);
  }
}
