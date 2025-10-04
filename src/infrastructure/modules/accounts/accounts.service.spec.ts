import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountRepository } from '../../../domain/repositories/account.repository';
import { Account } from '../../../domain/entities/account.entity';

describe('AccountsService', () => {
  let service: AccountsService;
  let accountRepository: jest.Mocked<AccountRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: AccountRepository,
          useValue: {
            save: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    accountRepository = module.get(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the CreateAccountUseCase', async () => {
      const createAccountDto = {
        accountHolderName: 'John Doe',
        initialBalance: 100,
      };
      const account = Account.create(
        createAccountDto.accountHolderName,
        createAccountDto.initialBalance,
      );
      accountRepository.save.mockResolvedValue(account);

      const result = await service.create(createAccountDto);

      expect(result).toEqual(account);
    });
  });

  describe('findAll', () => {
    it('should call the ListAccountsUseCase', async () => {
      const accounts = [Account.create('John Doe', 100)];
      accountRepository.findAll.mockResolvedValue(accounts);

      const result = await service.findAll();

      expect(result).toEqual(accounts);
    });
  });

  describe('findOne', () => {
    it('should call the GetAccountUseCase', async () => {
      const account = Account.create('John Doe', 100);
      accountRepository.findById.mockResolvedValue(account);

      const result = await service.findOne('1');

      expect(result).toEqual(account);
    });
  });
});
