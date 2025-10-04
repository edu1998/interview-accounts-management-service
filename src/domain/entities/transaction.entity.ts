import { TransactionType } from '../../resources/enums/transaction-type.enum';
import { Account } from './account.entity';
import { TransactionStrategyFactory } from '../services/transaction/factories/transaction-strategy.factory';

export class Transaction {
  private constructor(
    public readonly id: string | null,
    public readonly accountId: string,
    public readonly type: TransactionType,
    public readonly amount: number,
  ) {}

  public static create(
    accountId: string,
    type: TransactionType,
    amount: number,
  ) {
    return new Transaction(null, accountId, type, amount);
  }

  public static hydrate(
    id: string,
    accountId: string,
    type: TransactionType,
    amount: number,
  ): Transaction {
    return new Transaction(id, accountId, type, amount);
  }

  public applyTo(account: Account) {
    const strategy = TransactionStrategyFactory.create(this.type);
    strategy.apply(account, this.amount);
  }
}
