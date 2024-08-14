import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly productVariantId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}
