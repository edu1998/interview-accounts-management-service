import { Account } from './account.entity';

describe('Account Entity', () => {
  it('should create a new account', () => {
    const account = Account.create('Eduardo Tordecilla', 100);
    expect(account).toBeInstanceOf(Account);
    expect(account.holderName).toBe('Eduardo Tordecilla');
    expect(account.getBalance()).toBe(100);
    expect(account.id).toBeNull();
    expect(account.accountNum).toBeNull();
  });

  it('should hydrate an account', () => {
    const account = Account.hydrate('1', 'Eduardo Tordecilla', '123456', 100);
    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBe('1');
    expect(account.holderName).toBe('Eduardo Tordecilla');
    expect(account.accountNum).toBe('123456');
    expect(account.getBalance()).toBe(100);
  });

  describe('deposit', () => {
    it('should increase the balance', () => {
      const account = Account.create('Eduardo Tordecilla', 100);
      account.deposit(50);
      expect(account.getBalance()).toBe(150);
    });

    it('should throw an error if the amount is not positive', () => {
      const account = Account.create('Eduardo Tordecilla', 100);
      expect(() => account.deposit(-50)).toThrow(
        'The deposit must be positive',
      );
    });
  });

  describe('withdraw', () => {
    it('should decrease the balance', () => {
      const account = Account.create('Eduardo Tordecilla', 100);
      account.withdraw(50);
      expect(account.getBalance()).toBe(50);
    });

    it('should throw an error if the amount is not positive', () => {
      const account = Account.create('Eduardo Tordecilla', 100);
      expect(() => account.withdraw(-50)).toThrow(
        'Retirement must be positive',
      );
    });

    it('should throw an error if the balance is insufficient', () => {
      const account = Account.create('Eduardo Tordecilla', 100);
      expect(() => account.withdraw(150)).toThrow('Insufficient balance');
    });
  });

  describe('getBalance', () => {
    it('should return the current balance', () => {
      const account = Account.create('Eduardo Tordecilla', 100);
      expect(account.getBalance()).toBe(100);
    });
  });
});
