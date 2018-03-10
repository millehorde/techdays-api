import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: UserRepository) {}

    /**
     * Get all user in database
     * @returns {Promise<UserEntity[]>} list of all users
     */
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({});
    }

    /**
     * Get one user by email
     * @param {string} email
     * @returns {Promise<UserEntity>} wanted users
     */
    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {email}});
    }

    /**
     * Get one user by id
     * @param {string} id
     * @returns {Promise<UserEntity>} wanted user
     */
    async findOneById(id: string): Promise<UserEntity> {
        return await this.userRepository.findOneById(id);
    }

    /**
     * Create new user
     * @param {UserEntity} user
     * @returns {Promise<UserEntity>} user created
     */
    async insert(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }

    /**
     * Update one user by id
     * @param {string} user_id
     * @param {UserEntity} user
     * @returns {Promise<UserEntity>} updated user
     */
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

    /**
     * Delete one user by id
     * @param {string} user_id
     * @returns {Promise<void>}
     */
    async delete(user_id: string): Promise<void> {
        return this.userRepository.delete({user_id});
    }
}
