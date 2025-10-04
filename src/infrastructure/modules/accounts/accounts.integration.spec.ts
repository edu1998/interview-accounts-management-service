import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AppModule } from '../../../app.module';
import { Connection } from 'typeorm';

describe('Accounts Integration', () => {
  let controller: AccountsController;
  let module: TestingModule;
  let connection: Connection;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    connection = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await module.close();
  });

  afterEach(async () => {
    await connection.query('DELETE FROM accounts;');
  });

  it('should create an account and retrieve it', async () => {
    // Create account
    const createAccountDto = {
      accountHolderName: 'Eduardo Tordecilla',
      initialBalance: 100,
    };
    const createdAccount = await controller.create(createAccountDto);

    expect(createdAccount).toBeDefined();
    expect(createdAccount.id).toBeDefined();
    expect(createdAccount.holderName).toBe('Eduardo Tordecilla');
    expect(createdAccount.getBalance()).toBe(100);

    // Retrieve account
    const foundAccount = await controller.findOne(createdAccount.id as string);

    expect(foundAccount).toBeDefined();
    expect(foundAccount.id).toBe(createdAccount.id);
    expect(foundAccount.holderName).toBe('Eduardo Tordecilla');
    expect(foundAccount.getBalance()).toBe(100);
  });
});
