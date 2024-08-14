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
import { PaymentsService } from '../services/payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from '../dtos/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Get()
  getPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get(':paymentId')
  findPayment(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.paymentService.getOnePayment(paymentId);
  }

  @Post()
  createPayment(@Body() payload: CreatePaymentDto) {
    return this.paymentService.createPayment(payload);
  }

  @Put(':paymentId')
  updatePayment(
    @Body() payload: UpdatePaymentDto,
    @Param('paymentId', ParseIntPipe) paymentId: number,
  ) {
    return this.paymentService.updatePayment(paymentId, payload);
  }

  @Delete(':paymentId')
  deletePayment(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.paymentService.deletePayment(paymentId);
  }
}
