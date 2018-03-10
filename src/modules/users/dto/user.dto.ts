import {ApiModelProperty} from '@nestjs/swagger';
import {IsUUID, IsEmail, IsString, MaxLength, IsInt, Min, Max, IsDate} from 'class-validator';
import {UserType} from '../../../common/enums/userType.enum';

export class UserDto {
    @IsUUID('4')
    @ApiModelProperty()
    readonly user_id: string;

    @IsEmail()
    @ApiModelProperty()
    readonly email: string;

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

    @IsInt()
    @Min(0)
    @Max(2)
    @ApiModelProperty()
    readonly type: UserType;

    @IsDate()
    @ApiModelProperty()
    readonly token_boundary: Date;
}