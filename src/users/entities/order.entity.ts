import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Payment } from './payment.entity';
import { User } from './user.entity';
import { OrderProduct } from './order_product.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ name: 'client_id', type: 'uuid' })
  // clientId: string;

  @Column({ name: 'document', type: 'varchar', length: 11 })
  document: string;

  @Column({ name: 'address', type: 'text' })
  address: string;

  @Column({ name: 'phone', type: 'varchar', length: 13 })
  phone: string;

  @Column({ name: 'region', type: 'varchar', length: 30 })
  region: string;

  @Column({ name: 'province', type: 'varchar', length: 30 })
  province: string;

  @Column({ name: 'district', type: 'varchar', length: 30 })
  district: string;

  @Column({ name: 'shipping_method', type: 'varchar', length: 40 })
  shippingMethod: string;

  @Column({ name: 'email', type: 'varchar', length: 60 })
  email: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;

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

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProduct: OrderProduct[];
}
