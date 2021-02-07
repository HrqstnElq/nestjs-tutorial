import { JwtAthGuard } from './../auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginResult } from './interfaces/loginResult.interface';
import { RegisterDto } from './dto/register.dto';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('public')
  GetPublic(): string {
    return this.userService.Public();
  }

  @Get('secret')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  GetSecret(@Req() req): string {
    return this.userService.Secret(req.user.id);
  }

  @Post('login')
  async Login(@Body() loginData: LoginDto): Promise<LoginResult> {
    return this.userService.Login(loginData);
  }

  @Post('register')
  async Register(@Body() registerData: RegisterDto): Promise<boolean> {
    return this.userService.Register(registerData);
  }
}
