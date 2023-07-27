import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private handleExeptions(error: any, method: 'create' | 'update'): void {
    if (error.code === 11000)
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    console.log(error);
    throw new InternalServerErrorException(
      `Can't ${method} pokemon - check server logs`,
    );
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExeptions(error, 'create');
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(param: string) {
    let pokemon!: Pokemon;
    if (!isNaN(+param))
      pokemon = await this.pokemonModel.findOne({ numPokemon: param });
    else if (isValidObjectId(param))
      pokemon = await this.pokemonModel.findById(param);
    if (!pokemon) {
      const pokemonByName = await this.pokemonModel.findOne({
        name: param.toLocaleLowerCase().trim(),
      });
      if (pokemonByName) pokemon = pokemonByName;
      else throw new NotFoundException(`Pokemon with ${param} not found`);
    }
    return pokemon;
  }

  async update(param: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(param);
    const name = updatePokemonDto.name;
    if (name) updatePokemonDto.name = name.toLocaleLowerCase();
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExeptions(error, 'update');
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    return `This action removes a #${id} pokemon`;
  }
}
