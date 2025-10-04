import { Account } from '../../../entities/account.entity';

export interface TransactionStrategy {
  apply(account: Account, amount: number): void;
}
