import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { UserDto } from '../../users/dto/user.dto';

export class AuthLoginDto {
  @InheritValidation(UserDto)
  @IsDefined()
  @ApiModelProperty({ required: true })
  readonly email: string;

  @InheritValidation(UserDto)
  @IsDefined()
  @ApiModelProperty({ required: true })
  readonly password: string;
}
