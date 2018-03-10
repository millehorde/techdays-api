import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customRepository } from '../../common/miscellaneous/injection.provider';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
    controllers: [UsersController],
    components: [customRepository(UserRepository), UsersService],
    exports: [UsersService],
})
export class UsersModule {}
