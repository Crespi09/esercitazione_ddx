import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class ItemDto {
    @IsString()
    @MinLength(2)
    name: string

    @IsString()
    color: string

    @IsOptional()
    @IsString()
    parentId?: string
}