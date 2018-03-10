import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customRepository } from '../../common/miscellaneous/injection.provider';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    components: [customRepository(UserRepository), UsersService],
    exports: [UsersService],
})
export class UsersModule {}
