import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('public')
  GetPublic(): string {
    return this.userService.Public();
  }

  @Get('secret')
  GetSecret(@Req() req): string {
    return this.userService.Secret(req.user.id);
  }
}
