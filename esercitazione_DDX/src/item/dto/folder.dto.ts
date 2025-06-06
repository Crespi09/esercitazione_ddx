import {IsNotEmpty, IsString, MinLength } from "class-validator"

export class FolderDto{
    @IsString()
    @MinLength(2)
    name : string

    @IsString()
    color : string
}