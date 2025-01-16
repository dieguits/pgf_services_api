import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { DataSource, Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Member } from 'src/members/entities/member.entity';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    private dataSource: DataSource,
  ) {}

  private async findOneEventById(eventId: number) {
    const eventEntity = await this.eventRepository.findOneBy({
      id: eventId,
    });

    if (!eventEntity) {
      throw new BadRequestException('Event does not exist');
    }

    return eventEntity;
  }

  async create(
    createAttendanceDto: CreateAttendanceDto,
    user: UserActiveInterface,
  ) {
    const eventEntity = await this.findOneEventById(createAttendanceDto.event);

    const eventDb = await this.findOneByEventIdMemberId(
      eventEntity,
      createAttendanceDto.member,
    );

    if (eventDb) {
      throw new BadRequestException('This member was already registered');
    }

    const memberEntity = await this.memberRepository.findOneBy({
      id: createAttendanceDto.member,
    });

    if (!memberEntity) {
      throw new BadRequestException('Member does not exist');
    }

    return await this.attendanceRepository.save({
      ...createAttendanceDto,
      event: eventEntity,
      member: memberEntity,
      user_created: user.id,
      user_updated: user.id,
    });
  }

  findAll() {
    return this.attendanceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  async findOneByEventIdMemberId(event: Event, memberId: number) {
    let eventEntity: Attendance[] = [];
    eventEntity = await this.attendanceRepository.find({
      where: {
        member: {
          id: memberId,
        },
        event: {
          id: event.id,
        },
      },
    });

    return eventEntity.length > 0 ? eventEntity[0] : undefined;
  }

  private async findAttendanceByEventId(eventId: number) {
    let eventEntity: Attendance[] = [];
    eventEntity = await this.attendanceRepository.find({
      where: {
        event: {
          id: eventId,
        },
      },
    });

    return eventEntity;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }

  async getAttendanceList(eventId: number) {
    const eventQuery = await this.eventRepository.findOneBy({ id: eventId });

    if (!eventQuery) {
      throw new BadRequestException('This event does not exist');
    }

    const attendanceQuery = await this.findAttendanceByEventId(eventId);
    const memberQuery = await this.memberRepository.find();
    const members = [];

    memberQuery.forEach(async (mem) => {
      const attendance = attendanceQuery.find(
        (att) => att.member.id === mem.id,
      );

      members.push({
        memberId: mem.id,
        name: `${mem.name} ${mem.last_name}`,
        family: mem.family.name,
        attendance: {
          id: attendance && attendance.id !== undefined ? attendance.id : 0,
          eventId:
            attendance && attendance.event && attendance.event.id !== undefined
              ? attendance.id
              : 0,
        },
      });
    });

    return members;
  }
}
