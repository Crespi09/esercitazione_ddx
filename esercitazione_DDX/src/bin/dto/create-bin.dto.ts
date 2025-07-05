import { IsNotEmpty, IsString } from "class-validator";

export class CreateBinDto {
      @IsNotEmpty()
      @IsString()
      itemId: string;
}
