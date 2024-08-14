import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto, UpdatePaymentDto } from '../dtos/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  getAllPayments() {
    return this.paymentRepo.find();
  }

  async getOnePayment(paymentId: number) {
    const payment = await this.paymentRepo.findOne({
      where: { paymentId: paymentId },
    });
    if (!payment) {
      throw new NotFoundException(`Payment ${paymentId} not found`);
    }
    return payment;
  }

  createPayment(data: CreatePaymentDto) {
    const newPayment = this.paymentRepo.create(data);
    return this.paymentRepo.save(newPayment);
  }

  async updatePayment(paymentId: number, changes: UpdatePaymentDto) {
    const payment = await this.getOnePayment(paymentId);
    this.paymentRepo.merge(payment, changes);
    return this.paymentRepo.save(payment);
  }

  async deletePayment(paymentId: number) {
    const deleteResult = await this.paymentRepo.delete(paymentId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Payment ${paymentId} not found`);
    }
    return deleteResult;
  }
}
