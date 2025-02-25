import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthType } from '../enums';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Sign In: Sign in to the application' })
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Sign Up: Sign up to the application' })
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // @ApiOperation({ summary: 'Refresh ToAttempt to refresh the tokenkens: Refresh the access and refresh tokens' })
  // @ApiResponse({ status: 200, description: 'Successfully refreshed the tokens' })
  // @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Refresh Tokens: Refresh the access and refresh tokens' })
  @Post('refresh-tokens')
  public refreshTokens(@Body() refreshTokenDto: RefreshTokenDTO) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
