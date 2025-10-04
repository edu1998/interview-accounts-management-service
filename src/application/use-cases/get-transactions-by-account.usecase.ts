import { UseCases } from '../../resources/interfaces/use-cases-contract.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export class GetTransactionsByAccountUseCase
  implements UseCases<Promise<Transaction[]>>
{
  constructor(private readonly transactionRepo: TransactionRepository) {}

  execute(accountId: string): Promise<Transaction[]> {
    return this.transactionRepo.findByAccountId(accountId);
  }
}
