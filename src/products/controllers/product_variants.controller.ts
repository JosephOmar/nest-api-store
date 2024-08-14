import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductVariantsService } from '../services/product_variants.service';
import {
  CreateProductVariantDto,
  UpdateProductVariantDto,
} from '../dtos/product_variant.dto';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private productVariantService: ProductVariantsService) {}

  @Get()
  getProductVariants() {
    return this.productVariantService.getAllProductVariants();
  }

  @Get(':productVariantId')
  findProductVariant(
    @Param('productVariantId', ParseIntPipe) productVariantId: number,
  ) {
    return this.productVariantService.getOneProductVariant(productVariantId);
  }

  @Post()
  createProductVariant(@Body() payload: CreateProductVariantDto) {
    return this.productVariantService.createProductVariant(payload);
  }

  @Put(':productVariantId')
  updateProductVariant(
    @Body() payload: UpdateProductVariantDto,
    @Param('productVariantId', ParseIntPipe) productVariantId: number,
  ) {
    return this.productVariantService.updateProductVariant(
      productVariantId,
      payload,
    );
  }

  @Delete(':productVariantId')
  deleteProductVariant(
    @Param('productVariantId', ParseIntPipe) productVariantId: number,
  ) {
    return this.productVariantService.deleteProductVariant(productVariantId);
  }
}
