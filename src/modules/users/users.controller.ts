import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserType } from '../../common/enums/userType.enum';
import { DtoValidationPipe } from '../../common/pipes/dto-validation.pipe';
import { CreateUserInDto } from './dto/create-user.in.dto';
import { UpdateUserInDto } from './dto/update-user.in.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiUseTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Get all users', type: UserDto, isArray: true })
    async findAll() {
        return await this.usersService.findAll();
    }

    // TODO remove to pass with AuthModule

    @Post()
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.', type: UserDto })
    async insert(@Body(new DtoValidationPipe()) createUserDto: CreateUserInDto) {
        const userToInsert = new UserEntity(createUserDto);

        return await this.usersService.insert(userToInsert);
    }

    // TODO add encryption password when password is updated

    @Put(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully updated.', type: UserDto })
    async update(@Param() params, @Body(new DtoValidationPipe()) updateUserDto: UpdateUserInDto) {
        const userUpdated = new UserEntity(updateUserDto);

        return await this.usersService.update(params.id, userUpdated);
    }

    @Put(':user_id/roles/:role')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully updated with new role.', type: UserDto })
    async changeRole(@Param() params) {
        if (params.role in UserType) {
            const userUpdated = new UserEntity({type: params.role});

            return await this.usersService.update(params.user_id, userUpdated);
        }else {
            throw new NotFoundException('This role doesn\'t exist.');
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully deleted.'})
    async delete(@Param() params) {
        return await this.usersService.delete(params.id);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Get one specific user by Id.', type: UserDto })
    async findOneById(@Param() params) {
        const user = await this.usersService.findOneById(params.id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
}
