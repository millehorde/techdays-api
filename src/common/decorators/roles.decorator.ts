import { ReflectMetadata } from '@nestjs/common';

import { UserType } from '../enum/userType.enum';

export const Roles = (...roles: UserType[]) => ReflectMetadata('roles', roles);
