import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateProductVariantDto {
  // @IsNumber()
  // @IsPositive()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly productId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly color: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly size: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly additionalPrice: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;
}

export class UpdateProductVariantDto extends PartialType(
  CreateProductVariantDto,
) {}
