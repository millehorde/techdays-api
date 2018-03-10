import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { EventDto } from '../../events/dto/event.dto';
import { SubjectDto } from './subject.dto';

export class UpdateSubjectInDto {
    @InheritValidation(SubjectDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly name: string;

    @InheritValidation(SubjectDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly linked_events: EventDto[];
}
