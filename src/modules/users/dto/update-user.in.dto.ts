import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { UserDto } from './user.dto';

export class UpdateUserInDto {
    @InheritValidation(UserDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly first_name: string;

    @InheritValidation(UserDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly last_name: string;

    @InheritValidation(UserDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly email: string;

    @InheritValidation(UserDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly password: string;
}
