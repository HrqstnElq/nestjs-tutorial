import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  Public(): string {
    return 'public';
  }

  Secret(userId: string): string {
    return `secret: ${userId}`;
  }
}
