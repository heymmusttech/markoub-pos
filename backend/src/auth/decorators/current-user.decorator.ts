import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../../constants';
import { CurrentUserPayload } from '../../interfaces';

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserPayload | undefined, ctx: ExecutionContext) => {
    // Get the request from the context
    const request = ctx.switchToHttp().getRequest();

    // Get the user from the request
    const user: CurrentUserPayload = request[REQUEST_USER_KEY]

    // If the field is not provided, return the entire user object
    return field ? user[field] : user;
  },
);