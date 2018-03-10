import { ReflectMetadata } from '@nestjs/common';
import { UserType } from '../enums/userType.enum';

export const Roles = (...roles: UserType[]) => ReflectMetadata('roles', roles);
