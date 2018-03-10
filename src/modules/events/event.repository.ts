import { EntityRepository, Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {}
