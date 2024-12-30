import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsString()
  @MinLength(10)
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(4)
  role: string;
}
