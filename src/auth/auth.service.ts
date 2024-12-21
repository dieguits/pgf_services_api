import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, last_name, email, password, role }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('user already exist!');
    }

    const passHashed = await bcryptjs.hash(password, 12);

    await this.userService.create({
      name,
      last_name,
      email,
      password: passHashed,
      role,
    });

    return {
      name,
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Info not valid');
    }

    const isPassValid = await bcryptjs.compare(password, user.password);
    if (!isPassValid) {
      throw new UnauthorizedException('Info pass not valid');
    }

    const payload = { email: user.email, role: user.role.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    const user = await this.userService.findOneByEmail(email);
    return {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      role: user.role.id,
    };
  }
}
