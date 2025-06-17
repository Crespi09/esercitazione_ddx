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
    getFileById(id: string): Promise<string>;
}
