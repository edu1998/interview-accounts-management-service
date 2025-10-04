/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { TransactionStrategyFactory } from './transaction-strategy.factory';
import { TransactionType } from '../../../../resources/enums/transaction-type.enum';
import { DepositStrategy } from '../strategies/deposit.strategy';
import { WithdrawalStrategy } from '../strategies/withdrawal.strategy';

describe('TransactionStrategyFactory', () => {
  it('should create a DepositStrategy for DEPOSIT type', () => {
    const strategy = TransactionStrategyFactory.create(TransactionType.DEPOSIT);
    expect(strategy).toBeInstanceOf(DepositStrategy);
  });

  it('should create a WithdrawalStrategy for WITHDRAWAL type', () => {
    const strategy = TransactionStrategyFactory.create(
      TransactionType.WITHDRAWAL,
    );
    expect(strategy).toBeInstanceOf(WithdrawalStrategy);
  });

  it('should throw an error for an invalid transaction type', () => {
    expect(() =>
      TransactionStrategyFactory.create('INVALID_TYPE' as any),
    ).toThrow('Invalid transaction type: INVALID_TYPE');
  });
});
