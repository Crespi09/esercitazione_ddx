import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator"

export class AuthDto{
    @IsString()
    @IsNotEmpty()
    @Matches(/^\S*$/, { message: 'Username must not contain spaces' })
    username? : string

    @IsString()
    @IsNotEmpty()
    password: string


}