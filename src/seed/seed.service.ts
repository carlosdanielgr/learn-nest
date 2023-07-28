import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IPokeResponse } from './interfaces/poke-res.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { IPokeEntity } from 'src/pokemon/interfaces/poke-entity.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  async executeSeed() {
    await this.pokemonService.deleteMany();

    const { data } = await this.axios.get<IPokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const allPokemons: IPokeEntity[] = [];

    data.results.forEach(({ url, name }) => {
      const segments = url.split('/');
      const numPokemon = +segments[segments.length - 2];
      allPokemons.push({ name, numPokemon });
    });

    this.pokemonService.insertMany(allPokemons);

    return `Data created successfully`;
  }
}
