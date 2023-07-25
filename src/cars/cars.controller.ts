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
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): Cars[] {
    return this.carsService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): Cars | string {
    const idCar = +id;
    return this.carsService.findCarById(idCar);
  }

  @Post()
  createCar(@Body() createCarDto: CreateCardDto): Cars {
    return this.carsService.createCard(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCardDto,
  ): Cars {
    return this.carsService.updateCard(id, body);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number): any {
    return {
      message: `Car id:${id} deleted`,
      id: id,
    };
  }
}
