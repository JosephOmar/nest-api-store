import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { Review } from '../../products/entities/review.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 60, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  @Exclude()
  password: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'lastname', type: 'varchar', length: 50 })
  lastname: string;

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

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
