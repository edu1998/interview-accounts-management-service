import { validate } from 'class-validator';
import { LoginDto } from './login.dto';

describe('LoginDto', () => {
  it('should be valid with correct properties', async () => {
    const dto = new LoginDto();
    dto.username = 'admin-user';
    dto.pass = '123456789';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should be invalid if username is not a string', async () => {
    const dto = new LoginDto();
    dto.username = 123 as any;
    dto.pass = '123456789';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be invalid if pass is not a string', async () => {
    const dto = new LoginDto();
    dto.username = 'admin-user';
    dto.pass = 123 as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
