import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class FileDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string

    @IsNotEmpty()
    @IsString()
    fileType: string

    @IsNotEmpty()
    storage: string

    @IsOptional()
    @IsString()
    parentId?: string

}