import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { User } from 'src/users/entities/user.entity';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto, user: UserActiveInterface) {
    const eventDateFormatted = new Date(createEventDto.event_date);

    return await this.eventRepository.save({
      ...createEventDto,
      event_date: eventDateFormatted,
      user_created: user.id,
      user_updated: user.id,
    });
  }

  findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    return await this.eventRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
    user: UserActiveInterface,
  ) {
    const dateFormatted = new Date(updateEventDto.event_date);
    return this.eventRepository.update(id, {
      ...updateEventDto,
      event_date: dateFormatted,
      user_updated: user.id,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  // private async validateUser(id: number) {
  //   const userEntity = this.userRepository.findOneBy({ id });

  //   if (!userEntity) {
  //     throw new BadRequestException('User not exist');
  //   }

  //   return userEntity;
  // }
}
