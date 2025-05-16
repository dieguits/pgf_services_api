import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/common/enums/rol.enum';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      role: createUserDto.role === Role.ADMIN ? Role.ADMIN : Role.USER,
    });
    return this.userRepository.save(user);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not exist');
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id);

    if (user.role !== 'admin' && user.id !== id) {
      throw new UnauthorizedException();
    }

    const userUpdated = await this.userRepository.update(id, {
      ...updateUserDto,
      role: updateUserDto.role === 'admin' ? Role.ADMIN : Role.USER,
    });

    return {
      id: id,
      name: updateUserDto.name,
      last_name: updateUserDto.last_name,
      email: updateUserDto.email,
      role: updateUserDto.role,
    };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.softDelete({ id });
    return user;
  }
}
