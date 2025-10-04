import { GetTransactionsByAccountUseCase } from './get-transactions-by-account.usecase';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionType } from '../../resources/enums/transaction-type.enum';

describe('GetTransactionsByAccountUseCase', () => {
  let getTransactionsByAccountUseCase: GetTransactionsByAccountUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    transactionRepository = {
      findByAccountId: jest.fn(),
    } as any;
    getTransactionsByAccountUseCase = new GetTransactionsByAccountUseCase(
      transactionRepository,
    );
  });

  it('should return a list of transactions for an account', async () => {
    const transactions = [
      Transaction.hydrate('1', '1', TransactionType.DEPOSIT, 100),
      Transaction.hydrate('2', '1', TransactionType.WITHDRAWAL, 50),
    ];
    transactionRepository.findByAccountId.mockResolvedValue(transactions);

    const result = await getTransactionsByAccountUseCase.execute('1');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(transactionRepository.findByAccountId).toHaveBeenCalledWith('1');
    expect(result).toEqual(transactions);
  });
});
