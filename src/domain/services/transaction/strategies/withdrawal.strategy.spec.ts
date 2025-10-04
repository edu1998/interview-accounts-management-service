import { WithdrawalStrategy } from './withdrawal.strategy';
import { Account } from '../../../entities/account.entity';

describe('WithdrawalStrategy', () => {
  it('should call the withdraw method on the account', () => {
    const strategy = new WithdrawalStrategy();
    const account = Account.create('John Doe', 100);
    const withdrawSpy = jest.spyOn(account, 'withdraw');

    strategy.apply(account, 50);

    expect(withdrawSpy).toHaveBeenCalledWith(50);
  });
});
