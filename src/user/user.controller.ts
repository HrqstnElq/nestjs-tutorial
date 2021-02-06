import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  GetPublic(): string {
    return this.userService.Public();
  }

  @Get()
  GetSecret(@Req() req): string {
    return this.userService.Secret(req.user.id);
  }
}
