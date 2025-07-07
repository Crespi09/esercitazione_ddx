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
    updateItem(@Param('id') id: string, @Body() dto: UpdateItemDto, @GetUser() user: User) {
        return this.itemService.updateItem(id, dto, user);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204
    deleteItem(@Param('id') id: string, @GetUser() user: User) {
        return this.itemService.deleteItem(id, user);
    }


    @Get('')
    async getItemByIds(@Query('ids') ids: string, @GetUser() user: User) {
        const itemIds = ids.split(',').map(id => id.trim());
        return this.itemService.getItemsByIds(itemIds, user);
    }


    @Get('all')
    @HttpCode(HttpStatus.OK) // 200
    allItems(@Query('limit') limit: string, @Query('offset') offset: string, @GetUser() user: User) {
        return this.itemService.allItems(parseInt(limit), parseInt(offset), user);
    }

    @Get(':id')
    singleItem(@Param('id') id: string, @GetUser() user: User) {
        return this.itemService.singleItem(id, user);
    }

}