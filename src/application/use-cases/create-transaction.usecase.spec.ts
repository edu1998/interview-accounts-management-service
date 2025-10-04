import { CreateTransactionUseCase } from './create-transaction.usecase';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionType } from '../../resources/enums/transaction-type.enum';

describe('CreateTransactionUseCase', () => {
  let createTransactionUseCase: CreateTransactionUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let accountRepository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    transactionRepository = {
      save: jest.fn(),
    } as any;
    accountRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as any;
    createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
      accountRepository,
    );
  });

  it('should create a transaction, apply it to the account, and save it', async () => {
    const transactionDto = {
      accountId: '1',
      type: TransactionType.DEPOSIT,
      amount: 100,
    };
    const account = Account.hydrate('1', 'Eduardo Tordecilla', '12345', 100);
    const transaction = Transaction.create(
      transactionDto.accountId,
      transactionDto.type,
      transactionDto.amount,
    );

    accountRepository.findById.mockResolvedValue(account);
    accountRepository.save.mockResolvedValue(account);
    transactionRepository.save.mockResolvedValue(transaction);

    const result = await createTransactionUseCase.execute(transactionDto);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(accountRepository.findById).toHaveBeenCalledWith('1');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(accountRepository.save).toHaveBeenCalledWith(account);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(transactionRepository.save).toHaveBeenCalledWith(transaction);
    expect(result).toEqual(transaction);
  });

  it('should throw an error if account is not found', async () => {
    const transactionDto = {
      accountId: '1',
      type: TransactionType.DEPOSIT,
      amount: 100,
    };

    accountRepository.findById.mockResolvedValue(null);

    await expect(
      createTransactionUseCase.execute(transactionDto),
    ).rejects.toThrow('Account not found');
  });
});
