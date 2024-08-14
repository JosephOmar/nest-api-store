import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [Number] })
  readonly products: number[];
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}
