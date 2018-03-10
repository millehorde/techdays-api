import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { SubjectDto } from '../../subjects/dto/subject.dto';
import { EventDto } from './event.dto';

export class CreateEventInDto {
    @InheritValidation(EventDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly name: string;

    @InheritValidation(EventDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly description: string;

    @InheritValidation(EventDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly date: Date;

    @InheritValidation(EventDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly duration: number;

    @InheritValidation(EventDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly places: number;

    @InheritValidation(EventDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly subjects: SubjectDto[];
}
