import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customRepository } from '../../common/miscellaneous/injection.provider';
import { AuthModule } from '../auth/auth.module';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
    imports: [TypeOrmModule.forFeature([SubjectEntity]), AuthModule],
    controllers: [SubjectsController],
    components: [customRepository(SubjectRepository), SubjectsService],
    exports: [SubjectsService],
})
export class SubjectsModule {}
