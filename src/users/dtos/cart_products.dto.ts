import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCartProductDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly cartId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly productVariantId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateCartProductDto extends PartialType(CreateCartProductDto) {}
