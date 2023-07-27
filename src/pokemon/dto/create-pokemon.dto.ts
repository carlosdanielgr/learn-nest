import { IsString, MinLength, IsInt, Min, IsPositive } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @Min(1)
  @IsPositive()
  numPokemon: number;
}
