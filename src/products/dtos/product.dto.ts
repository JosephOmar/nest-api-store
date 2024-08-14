import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly shortDescription: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [String] })
  readonly images: string[];

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly weight: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly dimensions: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly material: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly careInstructions: string[];

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @IsOptional()
  @IsPositive()
  @ValidateIf((item) => item.minPrice)
  maxPrice: number;
}
