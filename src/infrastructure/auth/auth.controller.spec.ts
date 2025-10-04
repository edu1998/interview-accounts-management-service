import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token if credentials are valid', async () => {
      const user = { userId: 0, username: 'admin-user' };
      const token = { access_token: 'some-token' };
      authService.validateUser.mockResolvedValue(user);
      authService.login.mockResolvedValue(token);

      const result = await controller.login({
        username: 'admin-user',
        pass: '123456789',
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(authService.validateUser).toHaveBeenCalledWith(
        'admin-user',
        '123456789',
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(authService.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(token);
    });

    it('should throw an UnauthorizedException if credentials are invalid', async () => {
      authService.validateUser.mockResolvedValue(null);

      await expect(
        controller.login({ username: 'wrong', pass: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
