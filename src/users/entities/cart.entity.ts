import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { User } from './user.entity';
import { CartProduct } from './cart_product.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  @Exclude()
  cartId: number;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @OneToMany(() => CartProduct, (cartProducts) => cartProducts.cart)
  cartProducts: CartProduct[];
}
