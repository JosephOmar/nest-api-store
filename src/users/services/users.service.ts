import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Role } from '../entities/role.entity';
import { Cart } from '../entities/cart.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
  ) {}

  getAllUsers() {
    return this.userRepo.find({
      relations: [
        'role',
        'orders.orderProduct.productVariant',
        'cart.cartProducts.productVariant',
      ],
    });
  }

  async getOneUser(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: [
        'role',
        'orders.orderProduct.productVariant',
        'cart.cartProducts.productVariant',
      ],
    });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: ['role'],
    });
    return user;
  }

  async createUser(data: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException(`User ${data.email} Already Exists`);
    }

    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    const roleDefault = 'customer';
    if (data.roleId) {
      const role = await this.roleRepo.findOne({
        where: { roleId: data.roleId },
      });
      newUser.role = role;
    } else {
      const role = await this.roleRepo.findOne({
        where: { roleName: roleDefault },
      });
      newUser.role = role;
    }

    if (data.cartId) {
      const cart = await this.cartRepo.findOne({
        where: { cartId: data.cartId },
      });
      newUser.cart = cart;
    }

    return this.userRepo.save(newUser);
  }

  async updateUser(userId: string, changes: UpdateUserDto) {
    const user = await this.getOneUser(userId);

    if (changes.roleId) {
      const role = await this.roleRepo.findOne({
        where: { roleId: changes.roleId },
      });
      user.role = role;
    }

    if (changes.cartId) {
      const cart = await this.cartRepo.findOne({
        where: { cartId: changes.cartId },
      });
      user.cart = cart;
    }

    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async deleteUser(userId: string) {
    const deleteResult = await this.userRepo.delete(userId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return deleteResult;
  }
}
