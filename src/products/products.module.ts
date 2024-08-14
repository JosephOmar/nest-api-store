import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductVariantsService } from './services/product_variants.service';
import { ProductVariantsController } from './controllers/product_variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { ProductVariant } from './entities/product_variant.entity';
import { Product } from './entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { Review } from './entities/review.entity';
import { ReviewsService } from './services/reviews.service';
import { ReviewsController } from './controllers/reviews.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      Category,
      ProductVariant,
      Product,
      Review,
    ]),
    forwardRef(() => UsersModule),
  ],
  providers: [
    ProductsService,
    BrandsService,
    CategoriesService,
    ProductVariantsService,
    ReviewsService,
  ],
  controllers: [
    ProductsController,
    BrandsController,
    CategoriesController,
    ProductVariantsController,
    ReviewsController,
  ],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
