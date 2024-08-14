import { Controller, Post, Body } from '@nestjs/common';
import { CartProductService } from '../services/cart_product.service';
import { CreateCartProductDto } from '../dtos/cart_products.dto';

@Controller('cart-product')
export class CartProductController {
  constructor(private orderProductService: CartProductService) {}

  @Post()
  create(@Body() payload: CreateCartProductDto) {
    return this.orderProductService.create(payload);
  }
}
