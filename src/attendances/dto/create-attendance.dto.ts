import { IsNumber, isNumber, IsPositive } from 'class-validator';

export class CreateAttendanceDto {
  @IsNumber()
  @IsPositive()
  event: number;

  @IsNumber()
  @IsPositive()
  member: number;
}
