import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { ItemService } from "./item.service";
import { ItemDto } from "./dto/item.dto";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { UpdateItemDto } from "./dto/update-item.dto";

@UseGuards(JwtGuard)
@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) { }

    // @ API creazione item
    // @ API modifica item
    // @ API elimina item

    // ---- ricerche basate su filtri ----
    // @ API get tutti gli item
    // @ API get item singolo


    @Post('')
    @HttpCode(HttpStatus.CREATED) // 201
    createItem(@Body() dto: ItemDto, @GetUser() user: User) {
        return this.itemService.createItem(dto, user);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK) // 200
    updateItem(@Param('id') id: string, @Body() dto: UpdateItemDto) {
        return this.itemService.updateItem(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204
    deleteItem(@Param('id') id: string) {
        return this.itemService.deleteItem(id);
    }


    @Get('all')
    @HttpCode(HttpStatus.OK) // 200
    allItems(@Query('limit') limit: string, @Query('offset') offset: string) {
        return this.itemService.allItems(parseInt(limit), parseInt(offset));
    }

    @Get(':id')
    singleItem(@Param('id') id: string) {
        return this.itemService.singleItem(id);
    }

}