import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly roleName: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
