import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';

@Component()
export class SubjectsService {
    constructor(@InjectRepository(SubjectEntity) private readonly subjectRepository: SubjectRepository) {}

    async findAll(): Promise<SubjectEntity[]> {
        return await this.subjectRepository.find({ order: {name: 'ASC'}});
    }

    async findOneById(id: string): Promise<SubjectEntity> {
        return await this.subjectRepository.findOneById(id);
    }

    async insert(subject: SubjectEntity): Promise<SubjectEntity> {
        return await this.subjectRepository.save(subject);
    }

    async update(subject_id: string, subject: SubjectEntity): Promise<SubjectEntity> {
        const subjectToUpdate = await this.subjectRepository.findOneById(subject_id);

        Object.keys(subject).forEach((key) => {
            if (key !== 'subject_id') {
                subjectToUpdate[key] = subject[key];
            }
        });

        return await this.subjectRepository.save(subjectToUpdate);
    }

    async delete(subject_id: string): Promise<void> {
        return this.subjectRepository.delete({subject_id});
    }
}
