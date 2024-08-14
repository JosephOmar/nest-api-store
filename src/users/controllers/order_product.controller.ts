import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderProductDto } from '../dtos/order_product.dto';
import { OrderProductService } from '../services/order_product.service';

@Controller('order-product')
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.orderProductService.create(payload);
  }
}
