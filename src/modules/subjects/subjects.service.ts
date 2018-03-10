import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';

@Component()
export class SubjectsService {
    constructor(@InjectRepository(SubjectEntity) private readonly subjectRepository: SubjectRepository) {}

    /**
     * Get all subject in database
     * @returns {Promise<SubjectEntity[]>} list of all subjects
     */
    async findAll(): Promise<SubjectEntity[]> {
        return await this.subjectRepository.find({ order: {name: 'ASC'}});
    }

    /**
     * Get one subject by id
     * @param {string} id
     * @returns {Promise<SubjectEntity>} wanted subject
     */
    async findOneById(id: string): Promise<SubjectEntity> {
        return await this.subjectRepository.findOneById(id);
    }

    /**
     * Create new subject
     * @param {SubjectEntity} subject
     * @returns {Promise<SubjectEntity>} subject created
     */
    async insert(subject: SubjectEntity): Promise<SubjectEntity> {
        return await this.subjectRepository.save(subject);
    }

    /**
     * Update one subject by id
     * @param {string} subject_id
     * @param {SubjectEntity} subject
     * @returns {Promise<SubjectEntity>} updated subject
     */
    async update(subject_id: string, subject: SubjectEntity): Promise<SubjectEntity> {
        const subjectToUpdate = await this.subjectRepository.findOneById(subject_id);

        if (!subjectToUpdate) {
            throw new NotFoundException();
        }

        Object.keys(subject).forEach((key) => {
            if (key !== 'subject_id') {
                subjectToUpdate[key] = subject[key];
            }
        });

        return await this.subjectRepository.save(subjectToUpdate);
    }

    /**
     * Delete one subject by id
     * @param {string} subject_id
     * @returns {Promise<void>}
     */
    async delete(subject_id: string): Promise<void> {
        return this.subjectRepository.delete({subject_id});
    }
}
