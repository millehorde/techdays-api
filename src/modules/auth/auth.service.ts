import { Component, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { TokenDto } from './dto/token.dto';

export const ALGORITHM = 'HS512';
const tokenDuration = '60d';

export interface ITokenPayloadUnsigned {
  uid: string; // user id
  type: number; // user type
}

export interface ITokenPayload extends ITokenPayloadUnsigned {
  iat: number; // inserted by jwt
  exp: number; // inserted by jwt
}

@Component()
export class AuthService {
  /**
   * Compute and return the hash of the given `password`.
   *
   * @param password Password to be hashed.
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Determine whether a given `password` matches with a password
   * hash.
   *
   * @param password  Input password.
   * @param hash      Target user's password hash.
   *
   * @return `true` if the password matches with the hash, or `false`.
   */
  private static async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      global.console.warn(err.message || 'comparePassword failed', err);
      return false;
    }
  }

  /**
   * Generate a JWT.
   *
   * @param user User for whom the token is created.
   */
  private static createToken(user: UserEntity): string {
    const payload: ITokenPayloadUnsigned = {
      uid: user.user_id,
      type: user.type,
    };
    return jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: tokenDuration, algorithm: ALGORITHM });
  }

  constructor(private readonly usersService: UsersService) {}

  /**
   * Make sure the token is both valid:
   * - structurally (payload has all expected fields)
   * - in the database (must exist)
   *
   * @param payload Token payload.
   *
   * @return `true` if the token is valid and exists, or `false`.
   */
  async validateTokenPayload(payload: ITokenPayload): Promise<boolean> {
    if (!payload) {
      return false;
    }

    const user = await this.usersService.findOneById(payload.uid);

    if (!user || user.type !== payload.type) {
      return false;
    }

    return moment(user.token_boundary).isBefore(1000 * payload.iat);
  }

  /**
   * Look for a user account matching the given credentials (email
   * and password). If any, generate and send back a token. Otherwise,
   * throw.
   *
   * @param loginDto  Credentials used to authenticate.
   *
   * @throws {UnauthorizedException} User not found, or password is invalid.
   */
  async logIn(loginDto: AuthLoginDto): Promise<TokenDto> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('auth:error.wrongEmailPassword');
    }

    const isPasswordMatch = await AuthService.comparePassword(loginDto.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('auth:error.wrongEmailPassword');
    }

    return { token: AuthService.createToken(user) };
  }
}
