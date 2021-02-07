import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  GenerateToken(userId: string, username: string) {
    const payload = { id: userId, username: username };
    return this.jwtService.sign(payload);
  }
}
