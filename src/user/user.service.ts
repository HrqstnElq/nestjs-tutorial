import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.schema';
import { AuthService } from './../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResult } from './interfaces/loginResult.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  Public(): string {
    return 'public';
  }

  Secret(userId: string): string {
    return `secret: ${userId}`;
  }

  async Login(loginData: LoginDto): Promise<LoginResult> {
    const user = await this.userModel.findOne({ username: loginData.username });

    if (await this.userModel['comparePassword'](user, loginData.password))
      return { token: this.authService.GenerateToken(user._id, user.username) };
    else
      throw new HttpException(
        'Username or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
  }

  async Register(registerDto: RegisterDto): Promise<boolean> {
    const user = await this.userModel.findOne({
      username: registerDto.username,
    });

    if (user)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    else {
      try {
        const newUser: User = {
          name: registerDto.name,
          username: registerDto.username,
          password: registerDto.password,
        };
        await new this.userModel(newUser).save();
      } catch {
        return false;
      }
    }
  }
}
