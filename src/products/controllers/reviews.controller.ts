import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto, UpdateReviewDto } from '../dtos/review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  getReviews() {
    return this.reviewService.getAllReviews();
  }

  @Get(':reviewId')
  findReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewService.getOneReview(reviewId);
  }

  @Post()
  createReview(@Body() payload: CreateReviewDto) {
    return this.reviewService.createReview(payload);
  }

  @Put(':reviewId')
  updateReview(
    @Body() payload: UpdateReviewDto,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewService.updateReview(reviewId, payload);
  }

  @Delete(':reviewId')
  deleteReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewService.deleteReview(reviewId);
  }
}
