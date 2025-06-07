import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { FolderService } from "./item.service";
import { FolderDto } from "./dto/item.dto";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('folder')
export class FolderController {
    constructor(private folderService: FolderService) { }

    // @ API creazione cartella
    // @ API modifica cartella
    // @ API elimina cartella

    // ---- ricerche basate su filtri ----
    // @ API get tutte le cartelle
    // @ API get cartella singola


    @Post()
    createItem(@Body() dto: FolderDto, @GetUser() user: User) {
        return this.folderService.createItem(dto, user);
    }

    @Put(':id')
    updateItem(@Param('id') id: string, @Body() dto: FolderDto) {
        return this.folderService.updateItem(id, dto);
    }

    @Delete(':id')
    deleteItem(@Param('id') id: string) {
        return this.folderService.deleteItem(id);
    }


    @Get(':limit/:offset')
    allItems(@Param('limit') limit: string, @Param('offset') offset: string) {
        return this.folderService.allItems(parseInt(limit), parseInt(offset));
    }

    @Get('/id')
    singleItem(@Param('id') id: string) {
        return this.folderService.singleItem(id);
    }

}