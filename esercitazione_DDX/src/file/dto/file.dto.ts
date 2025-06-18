import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class FileDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    parentId?: string

}