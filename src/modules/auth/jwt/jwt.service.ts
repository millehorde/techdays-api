import { Component } from '@nestjs/common';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ITechDaysRequest } from '../../../common/miscellaneous/techdays-request';
import { ALGORITHM, AuthService, ITokenPayload } from '../auth.service';

type JWTStrategyCallback = (err: Error | null, isValid?: boolean, payload?: ITokenPayload) => any;

@Component()
export class JWTService {
  constructor(private readonly authService: AuthService) {
    const opts = {
      algorithm: ALGORITHM,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECRET,
    };

    // declare a strategy which can be used with `passport.authenticate`
    passport.use(
      new Strategy(opts, (request: Express.Request, payload: ITokenPayload, done: JWTStrategyCallback) => {
        this.authService
          .validateTokenPayload(payload)
          .then(isValid => done(null, isValid, payload))
          .catch(err => done(err));
      }),
    );
  }

  /**
   * Look for a valid JWT in the headers of the given `request`, and
   * determine whether it's valid (authentication allowed), or
   * invalid (authentication denied).
   *
   * If authentication succeeded, fill the current `Request` object
   * with our custom data (`techdays.user_id` and `techdays.type`).
   *
   * @param request Express request requiring an authentication.
   *
   * @return {Promise<boolean>} `true` if authentication is allowed, or `false`.
   */
  authenticateRequest(request: ITechDaysRequest): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const handler = passport.authenticate('jwt', { session: false }, ((err, isValid?: boolean, payload?: ITokenPayload) => {
        if (err) {
          global.console.warn(err.message || 'Invalid token payload', err);
          return resolve(false);
        }

        if (isValid && payload) {
          request.techdays.user_id = payload.uid;
          request.techdays.type = payload.type;
        }

        resolve(isValid);
      }) as JWTStrategyCallback);

      handler(request);
    });
  }
}
