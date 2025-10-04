import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepository {
  abstract save(transaction: Transaction): Promise<Transaction>;
  abstract findByAccountId(accountId: string): Promise<Transaction[]>;
}
