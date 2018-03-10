import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {getCopyConstruction, getOrDefault} from '../../../common/miscellaneous/misc';
import {UserEntity} from '../../users/entities/user.entity';
import {SubjectEntity} from '../../subjects/entities/subject.entity';

export interface IEvent {
    event_id?: string;
    name?: string;
    description?: string;
    date?: Date;
    duration?: number;
    places?: number;
    instructor?: UserEntity;
    subjects?: SubjectEntity[];
}

@Entity('events')
export class EventEntity implements IEvent{

    @PrimaryGeneratedColumn('uuid')
    event_id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    description: string;

    @Column({ type: 'datetime', nullable: false })
    date: Date;

    @Column({ type: 'int', nullable: false })
    duration: number;

    @Column({ type: 'int', nullable: false })
    places: number;

    @ManyToOne(type => UserEntity)
    instructor: UserEntity;

    @ManyToMany(type => SubjectEntity, subject => subject.linked_events)
    subjects: SubjectEntity[];

    constructor(copy: IEvent = {}) {
        this.event_id = getOrDefault(copy.event_id, undefined as any);
        this.name = getOrDefault(copy.name, '');
        this.description = getOrDefault(copy.description, '');
        this.date = getOrDefault(copy.date, new Date());
        this.duration = getOrDefault(copy.duration, 0);
        this.places = getOrDefault(copy.places, 0);
        this.instructor = getOrDefault(getCopyConstruction(UserEntity, copy.instructor), null as any);
        this.subjects = getOrDefault(copy.subjects, []);
    }
}
