import {ApiModelProperty} from '@nestjs/swagger';
import {IsUUID, IsString, ValidateNested, MaxLength, IsDate, IsInt, Max, Min} from 'class-validator';
import {Type} from 'class-transformer';
import {SubjectDto} from '../../subjects/dto/subject.dto';
import {UserDto} from '../../users/dto/user.dto';

export class EventDto {
    @IsUUID('4')
    @ApiModelProperty()
    readonly event_id: string;

    @IsString()
    @ApiModelProperty()
    readonly name: string;

    @IsString()
    @MaxLength(500)
    @ApiModelProperty()
    readonly description: string;

    @IsDate()
    @ApiModelProperty()
    readonly date: Date;

    @IsInt()
    @Min(0)
    @ApiModelProperty()
    readonly duration: number;

    @IsInt()
    @Max(100)
    @Min(0)
    @ApiModelProperty()
    readonly places: number;

    @ValidateNested()
    @Type(() => UserDto)
    @ApiModelProperty()
    readonly instructor: UserDto;

    @ValidateNested()
    @Type(() => SubjectDto)
    @ApiModelProperty()
    readonly subjects: SubjectDto[];
}