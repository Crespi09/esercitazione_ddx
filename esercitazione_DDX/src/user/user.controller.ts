import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";

@Controller('users')
export class UserController{
    
    @UseGuards(JwtGuard)
    @Get('me') // se lo lascio vuoto significa che cercando '/user' entra qui
    getMe(@GetUser()  user: User){
        return user;
    } 

    @Patch()
    ediUser(){}


}