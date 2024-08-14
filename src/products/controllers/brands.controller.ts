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
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandService.getAllBrands();
  }

  @Get(':brandId')
  findBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.getOneBrand(brandId);
  }

  @Post()
  createBrand(@Body() payload: CreateBrandDto) {
    return this.brandService.createBrand(payload);
  }

  @Put(':brandId')
  updateBrand(
    @Body() payload: UpdateBrandDto,
    @Param('brandId', ParseIntPipe) brandId: number,
  ) {
    return this.brandService.updateBrand(brandId, payload);
  }

  @Delete(':brandId')
  deleteBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.deleteBrand(brandId);
  }
}
