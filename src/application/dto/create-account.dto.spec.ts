import { validate } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';

describe('CreateAccountDto', () => {
  it('should be valid with correct properties', async () => {
    const dto = new CreateAccountDto();
    dto.accountHolderName = 'John Doe';
    dto.initialBalance = 100;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should be invalid if accountHolderName is not a string', async () => {
    const dto = new CreateAccountDto();
    dto.accountHolderName = 123 as any;
    dto.initialBalance = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid if initialBalance is not a number', async () => {
    const dto = new CreateAccountDto();
    dto.accountHolderName = 'John Doe';
    dto.initialBalance = '100' as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid if initialBalance is less than 1', async () => {
    const dto = new CreateAccountDto();
    dto.accountHolderName = 'John Doe';
    dto.initialBalance = 0;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
