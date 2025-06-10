import { PrismaService } from "src/prisma/prisma.service";
import { ItemDto } from "./dto/item.dto";
import { User } from "@prisma/client";
import { UpdateItemDto } from "./dto/update-item.dto";
export declare class ItemService {
    private prisma;
    constructor(prisma: PrismaService);
    createItem(dto: ItemDto, user: User): Promise<void>;
    updateItem(id: string, dto: UpdateItemDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string | null;
        parentId: number | null;
        ownerId: number;
    }>;
    deleteItem(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string | null;
        parentId: number | null;
        ownerId: number;
    }>;
    allItems(limit: number, offset: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string | null;
        parentId: number | null;
        ownerId: number;
    }[]>;
    singleItem(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string | null;
        parentId: number | null;
        ownerId: number;
    }>;
}
