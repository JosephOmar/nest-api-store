import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateReviewDto, UpdateReviewDto } from '../dtos/review.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  getAllReviews() {
    return this.reviewRepo.find({ relations: ['product', 'user'] });
  }

  async getOneReview(reviewId: number) {
    const review = await this.reviewRepo.findOne({
      where: { reviewId: reviewId },
      relations: ['product', 'user'],
    });
    if (!review) {
      throw new NotFoundException(`Review ${reviewId} not found`);
    }
    return review;
  }

  async createReview(data: CreateReviewDto) {
    const newReview = this.reviewRepo.create(data);

    if (data.productId) {
      const product = await this.productRepo.findOne({
        where: { productId: data.productId },
      });
      newReview.product = product;
    }

    if (data.userId) {
      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });
      newReview.user = user;
    }
    return this.reviewRepo.save(newReview);
  }

  async updateReview(reviewId: number, changes: UpdateReviewDto) {
    const review = await this.reviewRepo.findOne({
      where: { reviewId: reviewId },
    });

    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { productId: changes.productId },
      });
      review.product = product;
    }

    if (changes.userId) {
      const user = await this.userRepo.findOne({
        where: { id: changes.userId },
      });
      review.user = user;
    }

    this.reviewRepo.merge(review, changes);
    return this.reviewRepo.save(review);
  }

  async deleteReview(reviewId: number) {
    const deleteResult = await this.reviewRepo.delete(reviewId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Review ${reviewId} not found`);
    }
    return deleteResult;
  }
}
