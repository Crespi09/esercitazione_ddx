import { PrismaService } from 'src/prisma/prisma.service';
import { FileDto } from './dto/file.dto';
import { User } from '@prisma/client';
export declare class FileService {
    private prisma;
    constructor(prisma: PrismaService);
    saveFile(file: Express.Multer.File, dto: FileDto, user: User): Promise<{
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
    getFileById(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        fileType: string;
        fileName: string;
        storage: number;
        path: string;
        itemId: number;
    }>;
    getFilesByIds(fileIds: string[], user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        fileType: string;
        fileName: string;
        storage: number;
        path: string;
        itemId: number;
    }[]>;
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
