import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CurrentUserPayload } from '../../interfaces';

@Injectable()
export class GenerateTokensProvider {
  constructor(private readonly jwtService: JwtService) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        expiresIn,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        secret: process.env.JWT_SECRET,
      },
    );
  }

  public async generateTokens(userId: number, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      // generate access token
      this.signToken<Partial<CurrentUserPayload>>(
        userId,
        +process.env.JWT_ACCESS_TOKEN_TTL,
        {
          email,
          role,
        },
      ),

      // generate refresh token
      this.signToken<Partial<CurrentUserPayload>>(
        userId,
        +process.env.JWT_REFRESH_TOKEN_TTL,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
