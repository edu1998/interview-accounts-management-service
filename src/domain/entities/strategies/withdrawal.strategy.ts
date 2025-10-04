import { TransactionStrategy } from './transaction.strategy';
import { Account } from '../account.entity';

export class WithdrawalStrategy implements TransactionStrategy {
  apply(account: Account, amount: number): void {
    account.withdraw(amount);
  }
}
