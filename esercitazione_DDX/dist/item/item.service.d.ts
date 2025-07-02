import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto/item.dto';
import { User } from '@prisma/client';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemService {
    private prisma;
    constructor(prisma: PrismaService);
    createItem(dto: ItemDto, user: User): Promise<void>;
    updateItem(id: string, dto: UpdateItemDto, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string | null;
        ownerId: number;
        parentId: number | null;
    }>;
    deleteItem(id: string, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string | null;
        ownerId: number;
        parentId: number | null;
    }>;
    allItems(limit: number, offset: number, user: User): Promise<{
        folders: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            ownerId: number;
            parentId: number | null;
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
    singleItem(id: string, user: User): Promise<{
        item: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            ownerId: number;
            parentId: number | null;
        };
        sons: {
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
            folders: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                color: string | null;
                ownerId: number;
                parentId: number | null;
            }[];
        };
    }>;
}
