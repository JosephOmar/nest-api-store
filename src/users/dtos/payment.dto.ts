import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly orderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly paymentMethod: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly status: string;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
