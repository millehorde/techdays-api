import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: UserRepository) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({});
    }

    async findOneById(id: string): Promise<UserEntity> {
        return await this.userRepository.findOneById(id);
    }

    async insert(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }

    async update(user_id: string, user: UserEntity): Promise<UserEntity> {
        const userToUpdate = await this.userRepository.findOneById(user_id);

        if (!userToUpdate) {
            throw new NotFoundException();
        }

        Object.keys(user).forEach((key) => {
            if (key !== 'user_id') {
                userToUpdate[key] = user[key];
            }
        });

        return await this.userRepository.save(userToUpdate);
    }

    async delete(user_id: string): Promise<void> {
        return this.userRepository.delete({user_id});
    }
}
