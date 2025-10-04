import { TransactionStrategy } from './transaction.strategy';
import { Account } from '../account.entity';

export class DepositStrategy implements TransactionStrategy {
  apply(account: Account, amount: number): void {
    account.deposit(amount);
  }
}
