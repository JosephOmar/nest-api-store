import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from '../dtos/order_product.dto';

import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order_product.entity';
import { ProductVariant } from '../../products/entities/product_variant.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(ProductVariant)
    private productVariantRepo: Repository<ProductVariant>,
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
  ) {}

  async create(data: CreateOrderProductDto) {
    const order = await this.orderRepo.findOne({ where: { id: data.orderId } });
    const productVariant = await this.productVariantRepo.findOne({
      where: { variantId: data.productVariantId },
    });
    const orderProduct = new OrderProduct();
    orderProduct.order = order;
    orderProduct.productVariant = productVariant;
    orderProduct.quantity = data.quantity;

    return this.orderProductRepo.save(orderProduct);
  }
}
