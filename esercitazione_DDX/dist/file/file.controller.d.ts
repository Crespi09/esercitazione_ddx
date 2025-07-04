import { FileService } from './file.service';
import { User } from '@prisma/client';
import { FileDto } from './dto/file.dto';
import { Response } from 'express';
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File, dto: FileDto, user: User): Promise<{
        message: string;
        item: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            ownerId: number;
            parentId: number | null;
        };
        file: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            fileType: string;
            fileName: string;
            storage: number;
            path: string;
            itemId: number;
        };
        user: number;
    }>;
    getFilesByIds(ids: string, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        fileType: string;
        fileName: string;
        storage: number;
        path: string;
        itemId: number;
    }[]>;
    getFile(id: string, res: Response): Promise<import("fs").ReadStream>;
    updateFile(id: string, dto: FileDto, user: User): Promise<{
        message: string;
        item: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            ownerId: number;
            parentId: number | null;
        };
        fileUpdated: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            fileType: string;
            fileName: string;
            storage: number;
            path: string;
            itemId: number;
        };
    }>;
    deleteFile(id: string, user: User): Promise<{
        message: string;
    }>;
}
