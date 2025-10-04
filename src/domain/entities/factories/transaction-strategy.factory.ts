import { TransactionType } from '../../../resources/enums/transaction-type.enum';
import { TransactionStrategy } from '../strategies/transaction.strategy';
import { DepositStrategy } from '../strategies/deposit.strategy';
import { WithdrawalStrategy } from '../strategies/withdrawal.strategy';

export class TransactionStrategyFactory {
  static create(type: TransactionType): TransactionStrategy {
    if (type === TransactionType.DEPOSIT) {
      return new DepositStrategy();
    }
    if (type === TransactionType.WITHDRAWAL) {
      return new WithdrawalStrategy();
    }
    throw new Error(`Invalid transaction type: ${type}`);
  }
}
