import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './entities/event.entity';
import { UpdateEventDto } from './update-event.dto';
import { Attendee } from './entities/attendee.entity';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}

  @Get()
  async findAll() {
    this.logger.log('Hit the findAll route');
    return await this.repository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get('practice2')
  async practice2() {
    // return await this.repository.findOne({
    //   where: { id: 1 },
    //   relations: { attendees: true },
    // });

    const event = await this.repository.findOne({
      where: { id: 1 },
      relations: ['attendees'],
    });

    // const event = new Event();
    // event.id = 1;

    const attendee = new Attendee();
    attendee.name = 'Test 3';
    // attendee.event = event;

    event.attendees.push(attendee);

    await this.repository.save(event);
    return event;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id);
    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  // You can also use the @UsePipes decorator to enable pipes.
  // It can be done per method, or for every method when you
  // add it at the controller level.
  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  // Create new ValidationPipe to specify validation group inside @Body
  // new ValidationPipe({ groups: ['update'] })
  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne(id);

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
  }
}
