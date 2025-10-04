import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user if credentials are valid', async () => {
      const result = await service.validateUser('admin-user', '123456789');
      expect(result).toEqual({ userId: 0, username: 'admin-user' });
    });

    it('should return null if credentials are invalid', async () => {
      const result = await service.validateUser('wrong', 'wrong');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { userId: 0, username: 'admin-user' };
      const token = 'some-token';
      jwtService.sign.mockReturnValue(token);

      const result = await service.login(user);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        userId: user.userId,
      });
      expect(result).toEqual({ access_token: token });
    });
  });
});
