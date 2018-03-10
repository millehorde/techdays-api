import { ApiModelProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class TokenDto {
  @ApiModelProperty()
  @Allow()
  readonly token: string;
}
