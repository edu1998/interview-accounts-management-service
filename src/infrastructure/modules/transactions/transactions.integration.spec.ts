import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { AppModule } from '../../../app.module';
import { Connection } from 'typeorm';
import { AccountsController } from '../accounts/accounts.controller';
import { TransactionType } from '../../../resources/enums/transaction-type.enum';

describe('Transactions Integration', () => {
  let transactionsController: TransactionsController;
  let accountsController: AccountsController;
  let module: TestingModule;
  let connection: Connection;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    transactionsController = module.get<TransactionsController>(
      TransactionsController,
    );
    accountsController = module.get<AccountsController>(AccountsController);
    connection = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM transactions;');
    await connection.query('DELETE FROM accounts;');
  });

  it('should create a deposit transaction and update the account balance', async () => {
    const createAccountDto = {
      accountHolderName: 'Eduardo Tordecilla',
      initialBalance: 100,
    };
    const createdAccount = await accountsController.create(createAccountDto);

    const createTransactionDto = {
      accountId: createdAccount.id as string,
      type: TransactionType.DEPOSIT,
      amount: 50,
    };
    const createdTransaction =
      await transactionsController.create(createTransactionDto);

    expect(createdTransaction).toBeDefined();
    expect(createdTransaction.id).toBeDefined();
    expect(createdTransaction.type).toBe(TransactionType.DEPOSIT);
    expect(createdTransaction.amount).toBe(50);

    const foundAccount = await accountsController.findOne(
      createdAccount.id as string,
    );
    expect(foundAccount.getBalance()).toBe(150);
  });

  it('should create a withdrawal transaction and update the account balance', async () => {
    const createAccountDto = {
      accountHolderName: 'Eduardo Tordecilla',
      initialBalance: 100,
    };
    const createdAccount = await accountsController.create(createAccountDto);

    const createTransactionDto = {
      accountId: createdAccount.id as string,
      type: TransactionType.WITHDRAWAL,
      amount: 50,
    };
    const createdTransaction =
      await transactionsController.create(createTransactionDto);

    expect(createdTransaction).toBeDefined();
    expect(createdTransaction.id).toBeDefined();
    expect(createdTransaction.type).toBe(TransactionType.WITHDRAWAL);
    expect(createdTransaction.amount).toBe(50);

    const foundAccount = await accountsController.findOne(
      createdAccount.id as string,
    );
    expect(foundAccount.getBalance()).toBe(50);
  });
});
