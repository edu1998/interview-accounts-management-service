import { validate } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';
import { TransactionType } from '../../resources/enums/transaction-type.enum';

describe('CreateTransactionDto', () => {
  it('should be valid with correct properties', async () => {
    const dto = new CreateTransactionDto();
    dto.accountId = '1';
    dto.type = TransactionType.DEPOSIT;
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should be invalid if accountId is not defined', async () => {
    const dto = new CreateTransactionDto();
    dto.type = TransactionType.DEPOSIT;
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid if type is not a valid enum value', async () => {
    const dto = new CreateTransactionDto();
    dto.accountId = '1';
    dto.type = 'INVALID' as any;
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid if amount is not a number', async () => {
    const dto = new CreateTransactionDto();
    dto.accountId = '1';
    dto.type = TransactionType.DEPOSIT;
    dto.amount = '100' as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid if amount is less than 1', async () => {
    const dto = new CreateTransactionDto();
    dto.accountId = '1';
    dto.type = TransactionType.DEPOSIT;
    dto.amount = 0;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
