import { ApiModelProperty } from '@nestjs/swagger';
import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { UserType } from '../../../common/enums/userType.enum';
import { UserDto } from './user.dto';

export class UserLightOutDto {
    @InheritValidation(UserDto)
    @ApiModelProperty()
    readonly user_id: string;

    @InheritValidation(UserDto)
    @ApiModelProperty()
    readonly first_name: string;

    @InheritValidation(UserDto)
    @ApiModelProperty()
    readonly last_name: string;

    @InheritValidation(UserDto)
    @ApiModelProperty()
    readonly email: string;

    @InheritValidation(UserDto)
    @ApiModelProperty()
    readonly type: UserType;
}
