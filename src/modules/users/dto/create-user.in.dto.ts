import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';
import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { UserDto } from './user.dto';

export class CreateUserInDto {
    @InheritValidation(UserDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly first_name: string;

    @InheritValidation(UserDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly last_name: string;

    @InheritValidation(UserDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly email: string;

    @InheritValidation(UserDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly password: string;
}
