import { Injectable, NotFoundException } from '@nestjs/common';
import { Cars } from './cars.interface';
import { CreateCardDto, UpdateCardDto } from './dto';

@Injectable()
export class CarsService {
  private CARS: Cars[] = [
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

  createCard(cardDto: CreateCardDto): Cars {
    const newCard: Cars = { ...cardDto, id: this.CARS.at(-1).id + 1 };
    this.CARS.push(newCard);
    return newCard;
  }

  findCarById(id: number): Cars | string {
    const car = this.CARS.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car id:${id} not found`);
    return car;
  }

  updateCard(id: number, updateCardDto: UpdateCardDto): Cars {
    // let cardDb = this.findCarById(id) as Cars;

    const indexCard = this.CARS.findIndex((cars) => cars.id === id);
    this.CARS[indexCard] = { ...this.CARS[indexCard], ...updateCardDto };
    return this.CARS[indexCard];
  }
}
