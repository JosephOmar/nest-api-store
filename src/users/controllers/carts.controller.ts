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
import { CartsService } from '../services/carts.service';
import { CreateCartDto, UpdateCartDto } from '../dtos/cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private cartService: CartsService) {}

  @Get()
  getCarts() {
    return this.cartService.getAllCarts();
  }

  @Get(':cartId')
  findCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.getOneCart(cartId);
  }

  @Post()
  createCart(@Body() payload: CreateCartDto) {
    return this.cartService.createCart(payload);
  }

  @Put(':cartId')
  updateCart(
    @Body() payload: UpdateCartDto,
    @Param('cartId', ParseIntPipe) cartId: number,
  ) {
    return this.cartService.updateCart(cartId, payload);
  }

  @Delete(':cartId')
  deleteCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.deleteCart(cartId);
  }
}
