import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/user/enums/RolesEnum';

export const ROLES_KEY = 'role';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
