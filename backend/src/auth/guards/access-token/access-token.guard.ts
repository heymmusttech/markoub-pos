import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../../constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request from the execution context
    const request = context.switchToHttp().getRequest();

    // Extract the the token from the headers
    const token = this.extractToken(request);

    // If the token is not present, throw an error
    if (!token) {
      throw new UnauthorizedException("Sorry, you are not authorized to access. token is missing");
    }

    // Verify the token
    // If the token is invalid, throw an error
    try{
      const payload = await this.jwtService.verifyAsync(
        token, 
        {
          secret: process.env.JWT_SECRET,
          audience: process.env.JWT_TOKEN_AUDIENCE,
          issuer: process.env.JWT_TOKEN_ISSUER,
        }
      );

      request[REQUEST_USER_KEY] = payload;
    }catch(error){
      throw new UnauthorizedException("Sorry, you are not authorized to access. token is invalid");
    }

    // If the token is valid, continue the request
    return true;
  }

  private extractToken(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') || [];
    return token;
  }
}