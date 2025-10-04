import { CreateAccountUseCase } from './create-account.usecase';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';

describe('CreateAccountUseCase', () => {
  let createAccountUseCase: CreateAccountUseCase;
  let accountRepository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    accountRepository = {
      save: jest.fn(),
    } as any;
    createAccountUseCase = new CreateAccountUseCase(accountRepository);
  });

  it('should create and save an account', async () => {
    const accountInfo = {
      accountHolderName: 'Eduardo Tordecilla',
      initialBalance: 100,
    };
    const expectedAccount = Account.create(
      accountInfo.accountHolderName,
      accountInfo.initialBalance,
    );

    accountRepository.save.mockResolvedValue(expectedAccount);

    const result = await createAccountUseCase.execute(accountInfo);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(accountRepository.save).toHaveBeenCalledWith(expect.any(Account));
    expect(result).toEqual(expectedAccount);
  });
});
