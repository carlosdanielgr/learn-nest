import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto';

@Injectable()
export class BrandsService {
  private readonly _BRANDS = [
    {
      id: 1,
      name: 'Toyota',
      createAt: new Date(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand = {
      id: this._BRANDS.at(-1).id + 1,
      name: createBrandDto.name,
      createAt: new Date(),
    };
    this._BRANDS.push(brand);

    return brand;
  }

  findAll() {
    return this._BRANDS;
  }

  findOne(id: number) {
    const brand = this._BRANDS.find((brands) => brands.id === id);
    if (!brand) throw new NotFoundException(`Brand with id:${id} not found`);
    return brand;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    const indexbrand = this._BRANDS.findIndex((brands) => brands.id === id);
    if (indexbrand === -1)
      throw new NotFoundException(`Id:${id} brand not found`);
    this._BRANDS[indexbrand] = {
      ...this._BRANDS[indexbrand],
      ...updateBrandDto,
    };
    return this._BRANDS[indexbrand];
  }

  remove(id: number) {
    const indexBrand = this._BRANDS.findIndex((brands) => brands.id === id);
    if (indexBrand === -1)
      throw new NotFoundException(`Id:${id} brand not found`);
    this._BRANDS.splice(indexBrand, 1);
    return this._BRANDS;
  }
}
