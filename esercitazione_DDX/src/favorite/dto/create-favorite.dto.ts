import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsString()
  itemId: string;
}
