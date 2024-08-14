import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Payment } from '../entities/payment.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  getAllOrders() {
    return this.orderRepo.find({
      relations: ['payment', 'user', 'orderProduct.productVariant'],
    });
  }

  async getOneOrder(orderId: string) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['payment', 'user', 'orderProduct.productVariant'],
    });
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }
    return order;
  }

  async createOrder(data: CreateOrderDto) {
    const newOrder = this.orderRepo.create(data);

    if (data.paymentId) {
      const payment = await this.paymentRepo.findOne({
        where: { paymentId: data.paymentId },
      });
      newOrder.payment = payment;
    }

    if (data.userId) {
      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });
      newOrder.user = user;
    }

    return this.orderRepo.save(newOrder);
  }

  async updateOrder(orderId: string, changes: UpdateOrderDto) {
    const order = await this.getOneOrder(orderId);

    if (changes.paymentId) {
      const payment = await this.paymentRepo.findOne({
        where: { paymentId: changes.paymentId },
      });
      order.payment = payment;
    }

    if (changes.userId) {
      const user = await this.userRepo.findOne({
        where: { id: changes.userId },
      });
      order.user = user;
    }

    this.orderRepo.merge(order, changes);
    return this.orderRepo.save(order);
  }

  async deleteOrder(orderId: string) {
    const deleteResult = await this.orderRepo.delete(orderId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }
    return deleteResult;
  }
}
