import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Cars } from './cars.interface';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): Cars[] {
    return this.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): Cars | string {
    const idCar = +id;
    return this.carsService.findCarById(idCar);
  }

  @Post()
  createCar(@Body() body: any): any {
    return body;
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any): any {
    return {
      body: body,
      id: id,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number): any {
    return {
      message: `Car id:${id} deleted`,
      id: id,
    };
  }
}
