import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../../constants';
import { AuthType } from '../../enums';

export const Auth = (...authTypes: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, authTypes);