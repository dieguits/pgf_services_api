import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Auth(Role.USER)
  @Post()
  create(
    @Body() createAttendanceDto: CreateAttendanceDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.attendancesService.create(createAttendanceDto, user);
  }

  @Auth(Role.USER)
  @Get()
  async findAll() {
    return await this.attendancesService.findAll();
  }

  @Auth(Role.USER)
  @Get('attendanceList/:eventId')
  getAttendanceList(@Param('eventId') eventId: number) {
    return this.attendancesService.getAttendanceList(eventId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendancesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendancesService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendancesService.remove(+id);
  }
}
