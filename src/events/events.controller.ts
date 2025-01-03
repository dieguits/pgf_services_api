import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Auth(Role.ADMIN)
  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.eventsService.create(createEventDto, user);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.eventsService.update(id, updateEventDto, user);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }
}
