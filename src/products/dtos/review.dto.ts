import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateReviewDto {
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly userId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly rating: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly comment: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
