import { Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";

@UseGuards(JwtGuard) // serve per andare ad utilizzare l'access token per le chiamate api, senza da errore
@Controller('users')
export class UserController {
    // constructor(private userService: UserService)

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Post()
    updateUser(@GetUser() user: User) {
        // return this.userService.
    }

}