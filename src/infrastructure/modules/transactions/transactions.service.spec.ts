import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { AccountRepository } from '../../../domain/repositories/account.repository';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionType } from '../../../resources/enums/transaction-type.enum';
import { Account } from '../../../domain/entities/account.entity';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let accountRepository: jest.Mocked<AccountRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: TransactionRepository,
          useValue: {
            save: jest.fn(),
            findByAccountId: jest.fn(),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    transactionRepository = module.get(TransactionRepository);
    accountRepository = module.get(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the CreateTransactionUseCase', async () => {
      const createTransactionDto = {
        accountId: '1',
        type: TransactionType.DEPOSIT,
        amount: 100,
      };
      const account = Account.create('John Doe', 100);
      const transaction = Transaction.create(
        createTransactionDto.accountId,
        createTransactionDto.type,
        createTransactionDto.amount,
      );

      accountRepository.findById.mockResolvedValue(account);
      accountRepository.save.mockResolvedValue(account);
      transactionRepository.save.mockResolvedValue(transaction);

      const result = await service.create(createTransactionDto);

      expect(result).toEqual(transaction);
    });
  });

  describe('findAllByAccountId', () => {
    it('should call the GetTransactionsByAccountUseCase', async () => {
      const transactions = [
        Transaction.create('1', TransactionType.DEPOSIT, 100),
      ];
      transactionRepository.findByAccountId.mockResolvedValue(transactions);

      const result = await service.findAllByAccountId('1');

      expect(result).toEqual(transactions);
    });
  });
});
