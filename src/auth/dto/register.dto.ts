import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsEmail()
  @MinLength(13)
  email: string;

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @MinLength(4)
  role: string;
}
