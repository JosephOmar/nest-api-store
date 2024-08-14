import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariant } from '../../products/entities/product_variant.entity';
import { CartProduct } from '../entities/cart_product.entity';
import { Cart } from '../entities/cart.entity';
import { CreateCartProductDto } from '../dtos/cart_products.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(ProductVariant)
    private productVariantRepo: Repository<ProductVariant>,
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
  ) {}

  async create(data: CreateCartProductDto) {
    const cart = await this.cartRepo.findOne({
      where: { cartId: data.cartId },
    });
    const productVariant = await this.productVariantRepo.findOne({
      where: { variantId: data.productVariantId },
    });
    const cartProduct = new CartProduct();
    cartProduct.cart = cart;
    cartProduct.productVariant = productVariant;
    cartProduct.quantity = data.quantity;

    return this.cartProductRepo.save(cartProduct);
  }
}
