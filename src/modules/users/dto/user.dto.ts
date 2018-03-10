import {ApiModelProperty} from '@nestjs/swagger';
import {IsUUID, IsEmail, IsString, MaxLength, IsDate, IsEnum, Matches} from 'class-validator';
import {UserType} from '../../../common/enums/userType.enum';

export class UserDto {
    @IsUUID('4')
    @ApiModelProperty()
    readonly user_id: string;

    @IsEmail()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,45}$/, 'i')
    @ApiModelProperty()
    readonly password: string;

    @IsString()
    @MaxLength(50)
    @ApiModelProperty()
    readonly first_name: string;

    @IsString()
    @MaxLength(50)
    @ApiModelProperty()
    readonly last_name: string;

    @IsEnum(UserType)
    @ApiModelProperty()
    readonly type: UserType;

    @IsDate()
    @ApiModelProperty()
    readonly token_boundary: Date;
}