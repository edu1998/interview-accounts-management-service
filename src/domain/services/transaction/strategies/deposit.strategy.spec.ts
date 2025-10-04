import { DepositStrategy } from './deposit.strategy';
import { Account } from '../../../entities/account.entity';

describe('DepositStrategy', () => {
  it('should call the deposit method on the account', () => {
    const strategy = new DepositStrategy();
    const account = Account.create('John Doe', 100);
    const depositSpy = jest.spyOn(account, 'deposit');

    strategy.apply(account, 50);

    expect(depositSpy).toHaveBeenCalledWith(50);
  });
});
