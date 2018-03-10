import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { SubjectDto } from '../../subjects/dto/subject.dto';
import { EventDto } from './event.dto';

export class UpdateEventInDto {
    @InheritValidation(EventDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly name: string;

    @InheritValidation(EventDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly description: string;

    @InheritValidation(EventDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly date: Date;

    @InheritValidation(EventDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly duration: number;

    @InheritValidation(EventDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly places: number;

    @InheritValidation(EventDto)
    @IsOptional()
    @ApiModelProperty({ required: false })
    readonly subjects: SubjectDto[];
}
