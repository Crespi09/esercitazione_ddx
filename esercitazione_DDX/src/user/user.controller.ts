import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";

@Controller('users')
export class UserController{
    
    @UseGuards(JwtGuard) // serve per andare ad utilizzare l'access token per le chiamate api, senza da errore
    @Get('me')
    getMe(@GetUser()  user: User){
        return user;
    } 
}