import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ userId: number; username: string } | null> {
    // Hardcoded user for demonstration
    if (username === 'admin-user' && pass === '123456789') {
      return { userId: 0, username: 'admin-user' };
    }
    return null;
  }

  async login(user: { userId: number; username: string }) {
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
