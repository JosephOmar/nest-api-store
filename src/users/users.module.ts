import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { RolesService } from './services/roles.service';
import { OrdersController } from './controllers/orders.controller';
import { RolesController } from './controllers/roles.controller';
import { UsersController } from './controllers/users.controller';
import { CartsService } from './services/carts.service';
import { CartsController } from './controllers/carts.controller';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controllers/payments.controller';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { Payment } from './entities/payment.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';

import { OrderProduct } from './entities/order_product.entity';
import { OrderProductService } from './services/order_product.service';
import { OrderProductController } from './controllers/order_product.controller';
import { CartProductController } from './controllers/cart_product.controller';
import { CartProductService } from './services/cart_product.service';
import { CartProduct } from './entities/cart_product.entity';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    TypeOrmModule.forFeature([
      Cart,
      Order,
      Payment,
      Role,
      User,
      OrderProduct,
      CartProduct,
    ]),
  ],
  providers: [
    UsersService,
    OrdersService,
    RolesService,
    CartsService,
    PaymentsService,
    OrderProductService,
    CartProductService,
  ],
  controllers: [
    OrdersController,
    RolesController,
    UsersController,
    CartsController,
    PaymentsController,
    OrderProductController,
    CartProductController,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
