import { CanActivate, ExecutionContext, Guard, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { UserType } from '../../enums';
import { JWTService } from './jwt/jwt.service';

/**
 * Prevent unauthenticated users (or users not having the expected
 * roles) from accessing a Route.
 *
 * @example
 * @Roles(UserType.ADMIN)
 * @UseGuards(AuthGuard)
 *
 * @example
 * @UseGuards(AuthGuard)
 */
@Guard()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JWTService) {}

  async canActivate(dataOrRequest: any, context: ExecutionContext): Promise<boolean> {
    const request = dataOrRequest;
    const { parent, handler } = context;
    const parentRoles = this.reflector.get<UserType[]>('roles', parent);
    const handlerRoles = this.reflector.get<UserType[]>('roles', handler);
    const roles = ([] as UserType[]).concat(parentRoles || [], handlerRoles || []);

    const isAuthenticated = await this.jwtService.authenticateRequest(request);
    let isAuthorized = false;

    if (isAuthenticated) {
      isAuthorized = !roles.length || _.some(roles, role => role === request.gojob.user_type);
    }

    if (!isAuthenticated || !isAuthorized) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
