import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly clientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly region: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly province: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly district: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly shippingMethod: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly notes: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly paymentId: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  readonly userId: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
