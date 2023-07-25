import { IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly model: string;
}
