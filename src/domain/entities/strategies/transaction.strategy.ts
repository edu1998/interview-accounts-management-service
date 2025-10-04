import { Account } from '../account.entity';

export interface TransactionStrategy {
  apply(account: Account, amount: number): void;
}
