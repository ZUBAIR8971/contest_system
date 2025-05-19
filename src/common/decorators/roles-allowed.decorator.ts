import { SetMetadata } from '@nestjs/common';

import { RoleTypes } from '../interfaces';

export const RolesAllowed = (...roles: RoleTypes[]) => SetMetadata('roles', roles);
