import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private handleError(error): void {
    this.logger.error(error);
    throw new InternalServerErrorException('Review console');
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(param: string) {
    try {
      let product!: Product;
      if (isUUID(param))
        product = await this.productRepository.findOneBy({ id: param });
      else {
        const queryBuilder = this.productRepository.createQueryBuilder();
        product = await queryBuilder
          .where('slug =:slug', {
            slug: param,
          })
          .getOne();
      }
      return product;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const preProduct = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!preProduct)
      throw new NotFoundException(`Product with id:${id} not found`);
    try {
      const product = await this.productRepository.save(preProduct);
      return product;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return await this.productRepository.remove(product);
  }
}
