import { Transaction } from './transaction.entity';
import { TransactionType } from '../../resources/enums/transaction-type.enum';
import { Account } from './account.entity';
import { TransactionStrategyFactory } from '../services/transaction/factories/transaction-strategy.factory';

describe('Transaction Entity', () => {
  it('should create a new transaction', () => {
    const transaction = Transaction.create('1', TransactionType.DEPOSIT, 100);
    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.accountId).toBe('1');
    expect(transaction.type).toBe(TransactionType.DEPOSIT);
    expect(transaction.amount).toBe(100);
    expect(transaction.id).toBeNull();
  });

  it('should hydrate a transaction', () => {
    const transaction = Transaction.hydrate(
      '1',
      '1',
      TransactionType.DEPOSIT,
      100,
    );
    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.id).toBe('1');
    expect(transaction.accountId).toBe('1');
    expect(transaction.type).toBe(TransactionType.DEPOSIT);
    expect(transaction.amount).toBe(100);
  });

  describe('applyTo', () => {
    it('should call the factory with the correct transaction type and then apply the strategy', () => {
      const account = Account.create('Eduardo Tordecilla', 100);
      const transaction = Transaction.create(
        account.id ?? '1',
        TransactionType.DEPOSIT,
        50,
      );

      const strategy = { apply: jest.fn() };
      const factorySpy = jest
        .spyOn(TransactionStrategyFactory, 'create')
        .mockReturnValue(strategy);

      transaction.applyTo(account);

      expect(factorySpy).toHaveBeenCalledWith(TransactionType.DEPOSIT);
      expect(strategy.apply).toHaveBeenCalledWith(account, 50);

      factorySpy.mockRestore();
    });
  });
});