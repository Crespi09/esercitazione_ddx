import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FolderDto } from "./dto/folder.dto";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class FolderService{
    constructor(private prisma: PrismaService) {}


    async createFolder(dto: FolderDto, user : User){
        try{
            const item = await this.prisma.item.create({
                data : {
                    name  : dto.name,
                    color : dto.color,
                    owner : { connect: { id: user.id } },

                    createdAt : new Date(),
                    updatedAt : new Date()
                    
                }
            })
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){ // duplicated fields error
                    throw new ForbiddenException('Credentials taken')
                }
            } 
            throw error;
        }
    }

}