import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IPokeResponse } from './interfaces/poke-res.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  async executeSeed() {
    const { data } = await this.axios.get<IPokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(({ url, name }) => {
      const segments = url.split('/');
      const numPokemon = +segments[segments.length - 2];
      this.pokemonService.create({ name, numPokemon });
    });

    return `Data created successfully`;
  }
}
