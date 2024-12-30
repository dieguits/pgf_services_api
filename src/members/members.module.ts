import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { AuthModule } from '../auth/auth.module';
import { FamiliesModule } from '../families/families.module';
import { FamiliesService } from '../families/families.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), FamiliesModule, AuthModule],
  controllers: [MembersController],
  providers: [MembersService, FamiliesService],
})
export class MembersModule {}
