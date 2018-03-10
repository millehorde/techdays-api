import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DtoValidationPipe } from '../../common/pipes/dto-validation.pipe';
import { CreateSubjectInDto } from './dto/create-subject.in.dto';
import { SubjectDto } from './dto/subject.dto';
import { UpdateSubjectInDto } from './dto/update-subject.in.dto';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController{
    constructor(private readonly subjectsService: SubjectsService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Get all subjects', type: SubjectDto, isArray: true })
    async findAll() {
        return await this.subjectsService.findAll();
    }

    @Post()
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The subject has been successfully created.', type: SubjectDto })
    async insert(@Body(new DtoValidationPipe()) createSubjectDto: CreateSubjectInDto) {
        const subjectToInsert = new SubjectEntity(createSubjectDto);

        return await this.subjectsService.insert(subjectToInsert);
    }

    @Put(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The subject has been successfully updated.', type: SubjectDto })
    async update(@Param() params, @Body(new DtoValidationPipe()) updateSubjectDto: UpdateSubjectInDto) {
        const subjectUpdated = new SubjectEntity(updateSubjectDto);

        return await this.subjectsService.update(params.id, subjectUpdated);
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The subject has been successfully deleted.'})
    async delete(@Param() params) {
        return await this.subjectsService.delete(params.id);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Get one specific subject by Id.', type: SubjectDto })
    async findOneById(@Param() params) {
        const subject = await this.subjectsService.findOneById(params.id);
        if (!subject) {
            throw new NotFoundException();
        }
        return subject;
    }
}
