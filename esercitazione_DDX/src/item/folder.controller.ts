import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { FolderService } from "./folder.service";
import { FolderDto } from "./dto/folder.dto";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('folder')
export class FolderController{
    constructor(private folderService: FolderService){}

    // @ API creazione cartella
	// @ API modifica cartella
	// @ API elimina cartella

	// ---- ricerche basate su filtri ----
	// @ API get tutte le cartelle
	// @ API get cartella singola


    @Post()
    createFolder(@Body() dto: FolderDto, @GetUser() user : User){
        return this.folderService.createFolder(dto, user);
    }

    @Put()
    updateFolder(@Body() dto : FolderDto){}

    @Delete()
    deleteFolder(@Body() dto : FolderDto){}


    // TODO - aggiungere i filtri

    @Get()
    allFolders(){}

    @Get('/id')
    singleFolder(){}

}