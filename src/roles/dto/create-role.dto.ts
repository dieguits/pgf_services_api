import { IsString, minLength, MinLength } from 'class-validator';
export class CreateRoleDto {
  @IsString()
  @MinLength(4)
  id: string;

  @IsString()
  @MinLength(4)
  role: string;
}
