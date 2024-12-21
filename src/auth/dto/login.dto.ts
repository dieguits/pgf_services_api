import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MinLength(13)
  email: string;

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  password: string;
}
