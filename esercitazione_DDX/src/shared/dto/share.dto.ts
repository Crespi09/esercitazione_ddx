import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class ShareDto {
    @IsString()
    @IsNotEmpty()
    item_id: string

    @IsString()
    @IsNotEmpty()
    shared_with_id: string
}