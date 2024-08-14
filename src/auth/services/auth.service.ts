import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.models';
import { CreateUserDto } from '../../users/dtos/user.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersServices: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersServices.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('password is wrong');
    }
    return user;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: CreateUserDto) {
    return await this.usersServices.createUser(data);
  }
}
