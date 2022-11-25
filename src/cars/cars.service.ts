import { Injectable, NotFoundException } from '@nestjs/common';
import { Cars } from './cars.interface';

@Injectable()
export class CarsService {
  private readonly CARS: Cars[] = [
    {
      id: 1,
      name: 'BMW',
      model: 'M3',
    },
    {
      id: 2,
      name: 'Audi',
      model: 'A4',
    },
    {
      id: 3,
      name: 'Mercedes',
      model: 'C63',
    },
    {
      id: 4,
      name: 'Porsche',
      model: '911',
    },
    {
      id: 5,
      name: 'Lamborghini',
      model: 'Aventador',
    },
  ];

  getAllCars(): Cars[] {
    return this.CARS;
  }

  findCarById(id: number): Cars | string {
    const car = this.CARS.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car id:${id} not found`);
    return car;
  }
}
