import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { users } from '../db/schema';
import { CurrentUserPayload } from '../interfaces';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { SignUpDto } from './dto/signup.dto';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: MySql2Database,

    private readonly generateTokensProvider: GenerateTokensProvider,

    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const user = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      const currentUser = user[0];

      if (!currentUser) {
        throw new BadRequestException('Incorrect email or password');
      }

      const correctPasseord = await bcrypt.compare(password, currentUser.password);
      if (!correctPasseord) {
        throw new BadRequestException('Incorrect password or password');
      }

      const tokens = await this.generateTokensProvider.generateTokens(currentUser.id, currentUser.email, currentUser.role);

      const {password: userPassword, ...currentUserWithoutPassword} = currentUser;

      return { ...currentUserWithoutPassword, tokens };
    } catch (error) {
      // If it's a known error (e.g., an instance of HttpException), rethrow it
      if (error instanceof Error) {
        throw error; // Propagate known errors (e.g., UnauthorizedException)
      }

      // Handle unexpected errors
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to database',
        },
      );
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const SALT_ROUNDS = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(signUpDto.password, SALT_ROUNDS);

    const user = await this.db
      .insert(users)
      .values({ ...signUpDto, password: hashedPassword });

    return user;
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDTO) {
    try {
        const { sub } = await this.jwtService.verifyAsync
        <Pick<CurrentUserPayload, 'sub'>>
        (refreshTokenDto.refreshToken, {
          audience: process.env.JWT_TOKEN_AUDIENCE,
          issuer: process.env.JWT_TOKEN_ISSUER,
          secret: process.env.JWT_SECRET,
        });

        const user = await this.db
        .select()
        .from(users)
        .where(eq(users.id, sub))
        .limit(1);

      const currentUser = user[0];

      return await this.generateTokensProvider.generateTokens(currentUser.id, currentUser.email, currentUser.role);
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
