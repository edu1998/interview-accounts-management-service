import { ListAccountsUseCase } from './list-accounts.usecase';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';

describe('ListAccountsUseCase', () => {
  let listAccountsUseCase: ListAccountsUseCase;
  let accountRepository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    accountRepository = {
      findAll: jest.fn(),
    } as any;
    listAccountsUseCase = new ListAccountsUseCase(accountRepository);
  });

  it('should return a list of accounts', async () => {
    const accounts = [
      Account.hydrate('1', 'Eduardo Tordecilla', '12345', 100),
      Account.hydrate('2', 'Paulo Tordecilla', '67890', 200),
    ];
    accountRepository.findAll.mockResolvedValue(accounts);

    const result = await listAccountsUseCase.execute();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(accountRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(accounts);
  });
});
