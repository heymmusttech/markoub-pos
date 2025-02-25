import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../../../constants';
import { AuthType } from '../../../enums';
import { AccessTokenGuard } from '../access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // Inject the reflector and access token guard
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  // define the default auth type
  private static readonly defaultAuthType = AuthType.Bearer;

  // define the auth type guard map
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the auth type from the request
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // Get the guards for the auth type
    const guards = authTypes.map(
      (authType) => this.authTypeGuardMap[authType],
    );

    // If no guards are found, throw an error
    const error = new UnauthorizedException(
      'Sorry, you are not authorized to access.',
    );

    // Loop through the guards and check if any of them can activate
    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((error) => {
        error: error
      });

      // If a guard can activate, return true
      if (canActivate) {
        return true;
      }
    }

    // If no guards can activate, throw an error
    throw error;
  }
}