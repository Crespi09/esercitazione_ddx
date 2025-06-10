import { ItemService } from "./item.service";
import { ItemDto } from "./dto/item.dto";
import { User } from "@prisma/client";
import { UpdateItemDto } from "./dto/update-item.dto";
export declare class ItemController {
    private itemService;
    constructor(itemService: ItemService);
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
    allItems(limit: string, offset: string): Promise<{
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
