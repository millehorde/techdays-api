import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm/typeorm.utils';
import * as faker from 'faker';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectsService } from './subjects.service';

const createSubjectEntitys = (total: number): SubjectEntity[] => {
    return Array.from({ length: total }).map((item: any, index: number) => ({
        subject_id: faker.random.uuid(),
        name: `subject${index}`,
        linked_events: [],
    }));
};

describe('SubjectsService', () => {
    let subjectsService: SubjectsService;
    let privateService: any;
    let subjectRepository: SubjectRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            components: [
                {
                    provide: getRepositoryToken(SubjectEntity),
                    useValue: {},
                },
                SubjectsService,
            ],
        }).compile();

        subjectsService = module.get<SubjectsService>(SubjectsService);
        privateService = subjectsService;
        subjectRepository = privateService.subjectRepository;
    });

    describe('findAll', () => {
        it('should executes subjectRepository.find one time', async () => {
            subjectRepository.find = jest.fn();

            await subjectsService.findAll();
            expect(subjectRepository.find).toHaveBeenCalledTimes(1);
        });

        it('should return list of all subjects that subjectRepository returns', async () => {
            const subjects = createSubjectEntitys(5);
            subjectRepository.find = jest.fn().mockReturnValue(subjects);

            const result = await subjectsService.findAll();
            expect(result).toEqual(subjects);
        });
    });
});
