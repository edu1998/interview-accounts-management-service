import { TransactionStrategy } from './transaction.strategy';
import { Account } from '../../../entities/account.entity';

export class DepositStrategy implements TransactionStrategy {
  apply(account: Account, amount: number): void {
    account.deposit(amount);
  }
}
