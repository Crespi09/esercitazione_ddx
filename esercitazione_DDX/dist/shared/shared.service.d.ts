import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { ShareDto } from './dto/share.dto';
export declare class SharedService {
    private prisma;
    constructor(prisma: PrismaService);
    addShareItem(dto: ShareDto, user: User): Promise<void>;
    removeShareItem(sharedId: string, user: User): Promise<HttpStatus>;
    allItemsShared(limit: number, offset: number, user: User): Promise<{
        folders: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            parentId: number | null;
            ownerId: number;
        }[];
        files: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            fileType: string;
            fileName: string;
            storage: number;
            path: string;
            itemId: number;
        }[];
    }>;
    singleItemShared(id: string, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        itemId: number;
        sharedWithId: number;
    }>;
}
