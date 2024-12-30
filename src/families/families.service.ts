import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
  ) {}

  async create(createFamilyDto: CreateFamilyDto, user: UserActiveInterface) {
    return await this.familyRepository.save({
      ...createFamilyDto,
      user_created: user.id,
      user_updated: user.id,
    });
  }

  async findAll() {
    return await this.familyRepository.find();
  }

  findOne(id: number) {
    const family = this.familyRepository.findOneBy({ id });

    if (!family) {
      throw new BadRequestException('Family not found');
    }

    return family;
  }

  async update(
    id: number,
    updateFamilyDto: UpdateFamilyDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id);

    return await this.familyRepository.update(id, {
      ...updateFamilyDto,
      user_updated: user.id,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.familyRepository.softDelete({ id });
  }
}
