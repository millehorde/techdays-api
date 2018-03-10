import {
    Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserType } from '../../common/enums/userType.enum';
import { DtoValidationPipe } from '../../common/pipes/dto-validation.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { CreateEventInDto } from './dto/create-event.in.dto';
import { EventDto } from './dto/event.dto';
import { UpdateEventInDto } from './dto/update-event.in.dto';
import { EventEntity } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller('events')
@ApiUseTags('Events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Get all events', type: EventDto, isArray: true })
    async findAll() {
        return await this.eventsService.findAll();
    }

    // TODO add user identify by token to instructor

    @Roles(UserType.ADMIN)
    @UseGuards(AuthGuard)
    @Post()
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The event has been successfully created.', type: EventDto })
    async insert(@Body(new DtoValidationPipe()) createEventDto: CreateEventInDto) {
        const eventToInsert = new EventEntity(createEventDto);

        return await this.eventsService.insert(eventToInsert);
    }

    // TODO add user identify by token to instructor

    @Roles(UserType.ADMIN)
    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The event has been successfully updated.', type: EventDto })
    async update(@Param() params, @Body(new DtoValidationPipe()) updateEventDto: UpdateEventInDto) {
        const eventUpdated = new EventEntity(updateEventDto);

        return await this.eventsService.update(params.id, eventUpdated);
    }

    @Roles(UserType.ADMIN)
    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The event has been successfully deleted.'})
    async delete(@Param() params) {
        return await this.eventsService.delete(params.id);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Get one specific event by Id.', type: EventDto })
    async findOneById(@Param() params) {
        const event = await this.eventsService.findOneById(params.id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }
}
