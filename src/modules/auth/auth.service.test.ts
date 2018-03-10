import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import * as moment from 'moment';
import { UserType } from '../../enums';
import { setupTests, unleash } from '../../utils/testing/test.tools';
import { UsersService } from '../users/users.service';
import { AuthService, ITokenPayload } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

describe('AuthService', () => {
  const { createUsers, passwordGenerator } = setupTests();
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      components: [
        {
          provide: UsersService,
          useValue: {},
        },
        AuthService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = unleash(authService).usersService;
  });

  describe('hashPassword', () => {
    it('returns a hash', async () => {
      const password = 'meow';
      const hash = await AuthService.hashPassword(password);
      expect(hash).not.toBeFalsy();
      expect(hash).not.toEqual(password);
    });
  });

  describe('comparePassword', () => {
    it('returns true when password matches the hash', async () => {
      const pwd = await passwordGenerator.get();
      const result = await unleash(AuthService).comparePassword(pwd.password, pwd.hash);
      expect(result).toBe(true);
    });

    it('returns false when password does not match the hash', async () => {
      const pwd = await passwordGenerator.get();
      const result = await unleash(AuthService).comparePassword('wrong-password', pwd.hash);
      expect(result).toBe(false);
    });
  });

  describe('createToken', () => {
    it('should create a valid token', async () => {
      const [user] = await createUsers();

      const token: string = await unleash(AuthService).createToken(user);
      const verified: any = jwt.verify(token, process.env.JWT_SECRET as string);

      expect(verified).toBeDefined();
      expect(verified.uid).toEqual(user.user_id);
      expect(verified.type).toEqual(user.type);
      const tenSecondAgo = Math.floor(Date.now() / 1000) - 10;
      expect(verified.iat).toBeGreaterThan(tenSecondAgo);
      expect(verified.exp).toBeGreaterThan(verified.iat);
    });
  });

  describe('validateTokenPayload', async () => {
    const getUserBase = (base: object = {}): object => {
      const defaultBoundary = moment()
        .subtract(1, 'day')
        .toDate();

      return {
        type: _.get(base, 'type', UserType.ADMIN),
        token_boundary: _.get(base, 'token_boundary', defaultBoundary),
      };
    };

    const getTokenPayload = (base: object = {}): ITokenPayload => {
      const { user } = base as any;

      return {
        uid: _.get(user, 'user_id', ''),
        type: _.get(base, 'type', UserType.ADMIN),
        iat: _.get(base, 'iat', moment().unix()),
        exp: _.get(
          base,
          'exp',
          moment()
            .add(30, 'days')
            .unix(),
        ),
      };
    };

    it('returns false directly if given payload is falsy', async () => {
      usersService.findOneById = jest.fn();

      const result = await authService.validateTokenPayload(undefined as any);
      expect(result).toBe(false);
      expect(usersService.findOneById).not.toHaveBeenCalled();
    });

    it('always looks for a user matching the "user id" (in payload)', async () => {
      const uid = 'fake-user-id';
      usersService.findOneById = jest.fn();

      const payload: ITokenPayload = {
        uid,
        type: UserType.GOJOBBER,
        iat: moment().unix(),
        exp: moment()
          .add(30, 'days')
          .unix(),
      };

      const validation = await authService.validateTokenPayload(payload);

      expect(usersService.findOneById).toHaveBeenCalledTimes(1);
      expect(usersService.findOneById).toHaveBeenCalledWith(uid);
    });

    it('returns true if the given payload is valid', async () => {
      const [user] = await createUsers(1, getUserBase());
      const payload = getTokenPayload({ user });
      usersService.findOneById = jest.fn().mockReturnValue(user);

      const validation = await authService.validateTokenPayload(payload);
      expect(validation).toEqual(true);
    });

    it('returns false if the "user type" (in payload) mismatches', async () => {
      const [user] = await createUsers(1, getUserBase({ type: UserType.GOJOBBER }));
      const payload = getTokenPayload({ user });
      usersService.findOneById = jest.fn().mockReturnValue(user);

      const validation = await authService.validateTokenPayload(payload);
      expect(validation).toEqual(false);
    });

    it('returns false if payload is outdated', async () => {
      const [user] = await createUsers(1, getUserBase({ token_boundary: moment().toDate() }));
      usersService.findOneById = jest.fn().mockReturnValue(user);
      const payload = getTokenPayload({
        iat: moment()
          .subtract(30, 'days')
          .unix(),
        exp: moment()
          .add(30, 'days')
          .unix(),
      });

      const validation = await authService.validateTokenPayload(payload);
      expect(validation).toEqual(false);
    });
  });

  describe('logIn', () => {
    it('throws UnauthorizedException if no matching user is found', async () => {
      // findOneByEmail returns undefined: expect an exception
      usersService.findOneByEmail = jest.fn().mockReturnValue(undefined);
      const loginDto: AuthLoginDto = { email: 'vincent@gojob.com', password: 't00stronk' };

      expect.assertions(1);
      try {
        await authService.logIn(loginDto);
      } catch (err) {
        expect(err instanceof UnauthorizedException).toBe(true);
      }
    });

    it('throws UnauthorizedException if password do not match', async () => {
      const [user] = await createUsers();
      const loginDto: AuthLoginDto = { email: user.email, password: 't00stronk' };

      usersService.findOneByEmail = jest.fn().mockReturnValue(user);
      expect.assertions(1);
      try {
        await authService.logIn(loginDto);
      } catch (err) {
        expect(err instanceof UnauthorizedException).toBe(true);
      }
    });

    it('tries to create a token if credentials are valid', async () => {
      const pwd = await passwordGenerator.get();
      const [user] = await createUsers(1, { password: pwd.hash });
      usersService.findOneByEmail = jest.fn().mockReturnValue(user);

      const loginDto: AuthLoginDto = {
        email: user.email,
        password: pwd.password,
      };
      const tokenDto = await authService.logIn(loginDto);

      expect(tokenDto).toBeDefined();
      expect(tokenDto.token).toBeDefined();
    });
  });
});
