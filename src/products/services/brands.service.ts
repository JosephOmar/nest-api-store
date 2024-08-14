import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  getAllBrands() {
    return this.brandRepo.find();
  }

  async getOneBrand(brandId: number) {
    const brand = await this.brandRepo.findOne({
      where: { brandId: brandId },
    });
    if (!brand) {
      throw new NotFoundException(`Brand ${brandId} not found`);
    }
    return brand;
  }

  createBrand(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async updateBrand(brandId: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne({
      where: { brandId: brandId },
    });
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  async deleteBrand(brandId: number) {
    const deleteResult = await this.brandRepo.delete(brandId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Brand ${brandId} not found`);
    }
    return deleteResult;
  }
}
