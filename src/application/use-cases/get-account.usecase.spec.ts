import { GetAccountUseCase } from './get-account.usecase';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';

describe('GetAccountUseCase', () => {
  let getAccountUseCase: GetAccountUseCase;
  let accountRepository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    accountRepository = {
      findById: jest.fn(),
    } as any;
    getAccountUseCase = new GetAccountUseCase(accountRepository);
  });

  it('should return an account if found', async () => {
    const account = Account.hydrate('1', 'Eduardo Tordecilla', '12345', 100);
    accountRepository.findById.mockResolvedValue(account);

    const result = await getAccountUseCase.execute('1');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(accountRepository.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(account);
  });

  it('should throw an error if account is not found', async () => {
    accountRepository.findById.mockResolvedValue(null);

    await expect(getAccountUseCase.execute('1')).rejects.toThrow(
      'Account with ID 1 not found',
    );
  });
});
