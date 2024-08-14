import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariant } from '../entities/product_variant.entity';
import {
  CreateProductVariantDto,
  UpdateProductVariantDto,
} from '../dtos/product_variant.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private productVariantRepo: Repository<ProductVariant>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  private getLastFiveChars(input: string): string {
    const stringWithoutSpaces = input.replace(/\s+/g, '');

    const lastFiveChars = stringWithoutSpaces.slice(-5);

    return lastFiveChars;
  }

  private async generateUniqueSKU(
    productId: number,
    data: CreateProductVariantDto,
  ): Promise<string> {
    let exists: boolean;
    const product = await this.productRepo.findOne({
      where: { productId: productId },
    });
    const productName = this.getLastFiveChars(product.name.toLocaleLowerCase());
    const productMaterial = product.material.toLocaleLowerCase();
    const productColor = data.color.toLocaleLowerCase();
    const productSize = data.size.toLocaleLowerCase();
    let productNumber = 1;
    let sku = '';
    do {
      sku =
        productName +
        productMaterial.substring(0, 3) +
        '-' +
        productColor.substring(0, 3) +
        '-' +
        productSize.substring(0, 1) +
        '-' +
        productNumber;
      const validateSku = await this.productVariantRepo.findOne({
        where: { sku: sku },
      });
      if (!validateSku) {
        exists = false;
      } else {
        exists = true;
        productNumber += 1;
      }
    } while (exists);
    return sku;
  }

  getAllProductVariants() {
    return this.productVariantRepo.find();
  }

  async getOneProductVariant(productVariantId: number) {
    const productVariant = await this.productVariantRepo.findOne({
      where: { variantId: productVariantId },
    });
    if (!productVariant) {
      throw new NotFoundException(
        `ProductVariant ${productVariantId} not found`,
      );
    }
    return productVariant;
  }

  async createProductVariant(data: CreateProductVariantDto) {
    const newProductVariant = this.productVariantRepo.create(data);
    const sku = await this.generateUniqueSKU(data.productId, data);
    newProductVariant.sku = sku;
    if (data.productId) {
      const product = await this.productRepo.findOne({
        where: { productId: data.productId },
      });
      newProductVariant.product = product;
    }
    return this.productVariantRepo.save(newProductVariant);
  }

  async updateProductVariant(
    productVariantId: number,
    changes: UpdateProductVariantDto,
  ) {
    const productVariant = await this.getOneProductVariant(productVariantId);

    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { productId: changes.productId },
      });
      productVariant.product = product;
    }

    this.productVariantRepo.merge(productVariant, changes);
    return this.productVariantRepo.save(productVariant);
  }

  async deleteProductVariant(productVariantId: number) {
    const deleteResult = await this.productVariantRepo.delete(productVariantId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        `ProductVariant ${productVariantId} not found`,
      );
    }
    return deleteResult;
  }
}
