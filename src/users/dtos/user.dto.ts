import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastname: string;

  @ApiProperty()
  readonly roleId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly cartId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
