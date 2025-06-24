import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { StorageService } from "./storage.service";

@UseGuards(JwtGuard)
@Controller('storage')
export class StorageController {
    constructor(private storageService: StorageService) { }

    @Get('')
    userStorage(@GetUser() user: User) {
        return this.storageService.userStorage(user);
    }

}