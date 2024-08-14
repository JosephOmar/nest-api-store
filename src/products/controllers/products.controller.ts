import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get()
  getProducts(@Query() params: FilterProductDto) {
    return this.productService.getAllProducts(params);
  }

  @Public()
  @Get(':productId')
  findProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.getOneProduct(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productService.createProduct(payload);
  }

  @Put(':productId')
  updateProduct(
    @Body() payload: UpdateProductDto,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productService.updateProduct(productId, payload);
  }

  @Delete(':productId')
  deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.deleteProduct(productId);
  }
}
