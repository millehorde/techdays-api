import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventRepository } from './event.repository';

@Component()
export class EventsService {
    constructor(@InjectRepository(EventEntity) private readonly eventRepository: EventRepository) {}

    async findAll(): Promise<EventEntity[]> {
        return await this.eventRepository.find({});
    }

    async findOneById(id: string): Promise<EventEntity> {
        return await this.eventRepository.findOneById(id);
    }

    async insert(event: EventEntity): Promise<EventEntity> {
        return await this.eventRepository.save(event);
    }

    async update(event_id: string, event: EventEntity): Promise<EventEntity> {
        const eventToUpdate = await this.eventRepository.findOneById(event_id);

        if (!eventToUpdate) {
            throw new NotFoundException();
        }

        Object.keys(event).forEach((key) => {
            if (key !== 'event_id') {
                eventToUpdate[key] = event[key];
            }
        });

        return await this.eventRepository.save(eventToUpdate);
    }

    async delete(event_id: string): Promise<void> {
        return this.eventRepository.delete({event_id});
    }
}
