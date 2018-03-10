import {EventDto} from '../../events/dto/event.dto';
import {IsUUID, IsString, ValidateNested} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';

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