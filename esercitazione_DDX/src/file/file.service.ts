import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileDto } from "./dto/file.dto";
import { User } from "@prisma/client";

@Injectable({})
export class FileService {
    constructor(private prisma: PrismaService) { }

    // TODO - create an item
    // TODO - create a file -> salvando il relativo path creato

    
    saveFile(file: Express.Multer.File, dto: FileDto, user: User) {
        console.log('Saving file info:', {
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            mimetype: file.mimetype,
            dto,
            user,
        });

        return {
            message: 'File uploaded successfully',
            filename: file.filename,
            user: user.id,
        };
    }

    // TODO - per il get andare a prendere il path dall'id passato e trasportare quello che ho scritto nel controller

    // async uploadFile(dto: FileDto, user: User) {

    //     const path = `uploads/${user.id}/${dto.name}`;

    //     // TODO - andare a creare un item correlato al file

    //     const item = await this.prisma.item.create({
    //         data: {
    //             name: dto.name,
    //             ...(dto.parentId
    //                 ? {
    //                     parent: {
    //                         connect: {
    //                             id: parseInt(dto.parentId)
    //                                 ? parseInt(dto.parentId)
    //                                 : undefined,
    //                         },
    //                     },
    //                 }
    //                 : {}),
    //             owner: { connect: { id: user.id } },

    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //         },
    //     });

    //     try {
    //         const file = await this.prisma.file.create({
    //             data: {
    //                 fileType: dto.fileType,
    //                 fileName: dto.name,
    //                 storage: dto.storage,
    //                 path: path,
    //                 item: {
    //                     connect: { id: item.id }
    //                 },
    //                 createdAt: new Date(),
    //                 updatedAt: new Date(),
    //             },
    //         });
    //         return file;
    //     } catch (error) {
    //         // Gestione degli errori specifici se necessario
    //         throw error;
    //     }

    // }
}