import {IsNotEmpty, IsString, MinLength } from "class-validator"

export class UpdateUserDto{
    @IsString()
    @MinLength(3)
    username? : string

    @IsString()
    refreshToken? : string

    @IsString()
    psw? : string
}