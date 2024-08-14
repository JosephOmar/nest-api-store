import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':orderId')
  findOrder(@Param('orderId') orderId: string) {
    return this.orderService.getOneOrder(orderId);
  }

  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.orderService.createOrder(payload);
  }

  @Put(':orderId')
  updateOrder(
    @Body() payload: UpdateOrderDto,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.updateOrder(orderId, payload);
  }

  @Delete(':orderId')
  deleteOrder(@Param('orderId') orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }
}
