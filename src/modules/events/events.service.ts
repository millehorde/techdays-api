import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventRepository } from './event.repository';

@Component()
export class EventsService {
    constructor(@InjectRepository(EventEntity) private readonly eventRepository: EventRepository) {}

    /**
     * Get all events in database
     * @returns {Promise<EventEntity[]>} list of all events
     */
    async findAll(): Promise<EventEntity[]> {
        return await this.eventRepository.find({});
    }

    /**
     * Get one specific event by id
     * @param {string} id
     * @returns {Promise<EventEntity>} wanted event
     */
    async findOneById(id: string): Promise<EventEntity> {
        return await this.eventRepository.findOneById(id);
    }

    /**
     * Create new event
     * @param {EventEntity} event
     * @returns {Promise<EventEntity>} new event created
     */
    async insert(event: EventEntity): Promise<EventEntity> {
        return await this.eventRepository.save(event);
    }

    /**
     * Update one event by id
     * @param {string} event_id
     * @param {EventEntity} event
     * @returns {Promise<EventEntity>} updated event
     */
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

    /**
     * Delete one event by id
     * @param {string} event_id
     * @returns {Promise<void>}
     */
    async delete(event_id: string): Promise<void> {
        return this.eventRepository.delete({event_id});
    }
}
