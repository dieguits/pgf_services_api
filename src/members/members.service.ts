import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Family } from 'src/families/entities/family.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto, user: UserActiveInterface) {
    const family = await this.validateFamily(createMemberDto.family);
    const dobFormatted = new Date(createMemberDto.dob);

    return await this.memberRepository.save({
      ...createMemberDto,
      family: family,
      dob: dobFormatted,
      user_created: user.id,
      user_updated: user.id,
    });
  }

  findAll() {
    return this.memberRepository.find();
  }

  findOne(id: number) {
    const member = this.memberRepository.findOneBy({ id });

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    return member;
  }

  async update(
    id: number,
    updateMemberDto: UpdateMemberDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id);

    const family = await this.validateFamily(updateMemberDto.family);
    const dobFormatted = new Date(updateMemberDto.dob);
    return this.memberRepository.update(id, {
      ...updateMemberDto,
      family: family,
      dob: dobFormatted,
      user_updated: user.id,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.memberRepository.softDelete({ id });
  }

  private async validateFamily(familyId: number) {
    const familyEntity = await this.familyRepository.findOneBy({
      id: familyId,
    });
    if (!familyEntity) {
      throw new BadRequestException('Family not Found');
    }

    return familyEntity;
  }
}
