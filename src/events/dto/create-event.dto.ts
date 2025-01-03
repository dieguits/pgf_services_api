import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  type: string;

  @IsString()
  event_date: string;

  @IsNumber()
  assigned_to: number;

  @IsNumber()
  @IsOptional()
  supported_by: number;
}
