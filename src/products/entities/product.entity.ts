import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Brand } from './brand.entity';
import { ProductVariant } from './product_variant.entity';
import { Review } from './review.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId: number;

  @Column({ name: 'slug', type: 'varchar', length: 100, nullable: true })
  slug: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ name: 'short_description', type: 'text', nullable: true })
  shortDescription: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Index()
  @Column({ name: 'price', type: 'decimal', nullable: true })
  price: number;

  @Column({ name: 'stock', type: 'integer', nullable: true })
  stock: number;

  @Column({ name: 'images', type: 'text', array: true, nullable: true })
  images: string[];

  @Column({ name: 'weight', type: 'integer', nullable: true })
  weight: number;

  @Column({ name: 'dimensions', type: 'varchar', length: 50, nullable: true })
  dimensions: string;

  @Column({ name: 'material', type: 'varchar', length: 100, nullable: true })
  material: string;

  @Column({ name: 'care_instructions', type: 'text', nullable: true })
  careInstructions: string[];

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

  @ManyToOne(() => Brand, (brand) => brand.product)
  brand: Brand;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product, {
    onDelete: 'CASCADE',
  })
  productVariant: ProductVariant[];

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_category',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];
}
