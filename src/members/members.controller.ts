import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(
    @Body() createMemberDto: CreateMemberDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.membersService.create(createMemberDto, user);
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.membersService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.membersService.update(id, updateMemberDto, user);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.membersService.remove(id);
  }
}
