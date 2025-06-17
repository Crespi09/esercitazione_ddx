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
            parentId: number | null;
            ownerId: number;
        };
        file: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            fileType: string;
            storage: number;
            fileName: string;
            path: string;
            itemId: number;
        };
        user: number;
    }>;
    getFile(id: string, res: Response): Promise<import("fs").ReadStream>;
}
