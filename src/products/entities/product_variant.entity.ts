import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Product } from './product.entity';

@Entity({ name: 'product_variants' })
export class ProductVariant {
  @PrimaryGeneratedColumn({ name: 'variant_id' })
  @Exclude()
  variantId: number;

  // @Column({ name: 'product_id', type: 'int' })
  // productId: number;

  @Column({ name: 'color', type: 'varchar', length: 30, nullable: true })
  color: string;

  @Column({ name: 'size', type: 'varchar', length: 20, nullable: true })
  size: string;

  @Column({ name: 'additional_price', type: 'decimal', nullable: true })
  additionalPrice: number;

  @Column({ name: 'stock', type: 'integer', nullable: true })
  stock: number;

  @Column({
    name: 'sku',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  sku: string;

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

  @ManyToOne(() => Product, (product) => product.productVariant)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
