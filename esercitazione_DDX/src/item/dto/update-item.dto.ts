import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateItemDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    color: string

    @IsOptional()
    @IsString()
    parentId?: string
}