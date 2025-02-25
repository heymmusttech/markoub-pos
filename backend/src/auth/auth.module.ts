import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, GenerateTokensProvider],
  controllers: [AuthController],
})
export class AuthModule {}
