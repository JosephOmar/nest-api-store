import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Between } from 'typeorm';
import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/product.dto';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  // ! GENERAR SLUG DE PRODUCTS

  private async generateUniqueSlug(data: CreateProductDto) {
    let slug: string;
    let exists: boolean;
    const nameProduct = data.name.toLocaleLowerCase();

    do {
      slug = nameProduct.replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const validateSlug = await this.productRepo.findOne({
        where: { slug: slug },
      });
      if (!validateSlug) {
        exists = false;
      } else {
        throw new NotFoundException(`El slug ${slug} ya existe`);
      }
    } while (exists);

    return slug;
  }

  // ! BUSQUEDA DE TODOS LOS PRODUCTOS

  getAllProducts(params?: FilterProductDto) {
    if (params) {
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;

      if (minPrice && maxPrice) {
        return this.productRepo.find({
          where: { price: Between(minPrice, maxPrice) },
        });
      }
      return this.productRepo.find({
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find();
  }

  async getOneProduct(productId: number) {
    const product = await this.productRepo.findOne({
      where: { productId: productId },
      relations: ['brand', 'reviews', 'productVariant', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }
    return product;
  }

  async createProduct(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);

    const slug = await this.generateUniqueSlug(data);
    newProduct.slug = slug;

    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { brandId: data.brandId },
      });
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.find({
        where: { categoryId: In(data.categoriesIds) },
      });
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async updateProduct(productId: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { productId: productId },
    });

    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { brandId: changes.brandId },
      });
      product.brand = brand;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async deleteProduct(productId: number) {
    const deleteResult = await this.productRepo.delete(productId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Product ${productId} not found`);
    }
    return deleteResult;
  }
}
