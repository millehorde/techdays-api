import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customRepository } from '../../common/miscellaneous/injection.provider';
import { EventEntity } from './entities/event.entity';
import { EventRepository } from './event.repository';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [EventsController],
    components: [customRepository(EventRepository), EventsService],
    exports: [EventsService],
})
export class EventsModule {}
