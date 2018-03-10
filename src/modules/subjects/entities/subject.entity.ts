import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {getOrDefault} from '../../../common/miscellaneous/misc';
import {EventEntity} from '../../events/entities/event.entity';

export interface ISubject {
    subject_id?: string;
    name?: string;
    linked_events?: EventEntity[];
}

@Entity('subjects')
export class SubjectEntity implements ISubject{

    @PrimaryGeneratedColumn('uuid')
    subject_id: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;

    @ManyToMany(type => EventEntity, event => event.subjects)
    linked_events: EventEntity[];

    constructor(copy: ISubject = {}) {
        this.subject_id = getOrDefault(copy.subject_id, undefined as any);
        this.name = getOrDefault(copy.name, '');
        this.linked_events = getOrDefault(copy.linked_events, []);
    }
}
