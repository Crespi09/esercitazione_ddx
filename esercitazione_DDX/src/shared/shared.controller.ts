import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { SharedService } from "./shared.service";
import { ShareDto } from "./dto/share.dto";

@UseGuards(JwtGuard)
@Controller('shared')
export class SharedController {
    constructor(private sharedService: SharedService) { }

    /*

    + @ API add share an item
	@ API remove share
	@ API edit share
    @ API get all shared items

    */

    @Post('')
    addShareItem(@Body() dto: ShareDto, @GetUser() user : User){
        return this.sharedService.addShareItem(dto, user);
    }

    @Delete(':id')
    removeShareItem(@Param('id') id : string, @GetUser() user : User){
        return this.sharedService.removeShareItem(id, user);
    }




}