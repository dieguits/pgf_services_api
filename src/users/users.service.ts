import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleRepository.findOneBy({
      id: createUserDto.role,
    });

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      role,
    });

    await this.userRepository.save(user);

    return {
      name: user.name,
      email: user.email,
    };
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const role = await this.roleRepository.findOneBy({
      id: updateUserDto.role,
    });

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    return await this.userRepository.update(id, {
      ...updateUserDto,
      role,
    });
  }

  async remove(id: number) {
    return await this.userRepository.softDelete({ id });
  }
}
