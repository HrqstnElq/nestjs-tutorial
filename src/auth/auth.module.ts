import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT } from 'src/config/jwt.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

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
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService, JwtStrategy],
})
export class AuthModule {}
