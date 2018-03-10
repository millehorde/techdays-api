import { Module } from '@nestjs/common';
import { JWTService } from './jwt/jwt.service';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  components: [AuthService, JWTService],
  exports: [AuthService, JWTService],
})
export class AuthModule {}
