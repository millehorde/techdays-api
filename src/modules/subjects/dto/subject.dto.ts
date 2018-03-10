import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { EventDto } from '../../events/dto/event.dto';

export class SubjectDto {
    @IsUUID('4')
    @ApiModelProperty()
    readonly subject_id: string;

    @IsString()
    @ApiModelProperty()
    readonly name: string;

    @ValidateNested()
    @Type(() => EventDto)
    @ApiModelProperty()
    readonly linked_events: EventDto[];
}
