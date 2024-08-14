import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CreateCartDto, UpdateCartDto } from '../dtos/cart.dto';
import { User } from '../entities/user.entity';
import { CartProduct } from '../entities/cart_product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
  ) {}

  getAllCarts() {
    return this.cartRepo.find({
      relations: ['cartProducts.productVariant'],
    });
  }

  async getOneCart(cartId: number) {
    const cart = await this.cartRepo.findOne({
      where: { cartId: cartId },
      relations: ['cartProducts.productVariant'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart ${cartId} not found`);
    }
    return cart;
  }

  async createCart(data: CreateCartDto) {
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    if (!user) {
      throw new NotFoundException(`User ${data.userId} not found`);
    }

    const newCart = this.cartRepo.create({ user });

    const savedCart = await this.cartRepo.save(newCart);

    if (data.products) {
      const cartProducts = await this.cartProductRepo.find({
        where: { id: In(data.products) },
      });
      newCart.cartProducts = cartProducts;
    }

    return savedCart;
  }

  async updateCart(cartId: number, changes: UpdateCartDto) {
    const cart = await this.getOneCart(cartId);

    if (changes.products) {
      const cartProducts = await this.cartProductRepo.find({
        where: { id: In(changes.products) },
      });
      cart.cartProducts = cartProducts;
    }

    return this.cartRepo.save(cart);
  }

  async deleteCart(cartId: number) {
    const deleteResult = await this.cartRepo.delete(cartId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Cart ${cartId} not found`);
    }
    return deleteResult;
  }
}
