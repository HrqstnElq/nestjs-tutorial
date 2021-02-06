import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  passwordConfirm: string;
}
