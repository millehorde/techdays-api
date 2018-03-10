import { Module } from '@nestjs/common';
import { JWTService } from './jwt/jwt.service';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
    controllers: [AuthController],
  components: [AuthService, JWTService],
  exports: [AuthService, JWTService],
})
export class AuthModule {}
