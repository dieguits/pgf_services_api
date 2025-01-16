import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';
import { MembersModule } from 'src/members/members.module';
import { MembersService } from 'src/members/members.service';
import { FamiliesModule } from '../families/families.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    EventsModule,
    MembersModule,
    FamiliesModule,
    AuthModule,
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService, EventsService, MembersService],
  exports: [TypeOrmModule],
})
export class AttendancesModule {}
