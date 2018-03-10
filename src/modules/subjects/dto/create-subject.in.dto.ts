import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { InheritValidation } from '../../../common/decorators/inherit-validation.decorator';
import { SubjectDto } from './subject.dto';

export class CreateSubjectInDto {
    @InheritValidation(SubjectDto)
    @IsDefined()
    @ApiModelProperty({ required: true })
    readonly name: string;
}
