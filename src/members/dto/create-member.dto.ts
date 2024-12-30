import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  email?: string;

  @IsString()
  phone_number: string;

  @IsString()
  @MinLength(4)
  gender: string;

  @IsString()
  @IsOptional()
  dob: string;

  @IsInt()
  @IsPositive()
  family: number;
}
