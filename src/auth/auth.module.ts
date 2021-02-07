import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT } from 'src/config/jwt.config';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT.secret,
      signOptions: {
        expiresIn: JWT.expiresIn,
      },
    }),
  ],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
