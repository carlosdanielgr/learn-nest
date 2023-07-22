import { IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly name: string;

  // @IsOptional()
  @IsString()
  readonly model: string;
}
