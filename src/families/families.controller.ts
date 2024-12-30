import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(
    @Body() createFamilyDto: CreateFamilyDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    console.log('Arriving here to families:::: ', user);
    return this.familiesService.create(createFamilyDto, user);
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.familiesService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.familiesService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFamilyDto: UpdateFamilyDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.familiesService.update(id, updateFamilyDto, user);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.familiesService.remove(id);
  }
}
