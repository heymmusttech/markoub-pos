import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../constants';
import { RolesType } from '../../enums';

export const Roles = (...roles: RolesType[]) => 
    SetMetadata(ROLES_KEY, roles);