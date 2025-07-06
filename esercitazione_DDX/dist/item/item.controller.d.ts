import { ItemService } from "./item.service";
import { ItemDto } from "./dto/item.dto";
import { User } from "@prisma/client";
import { UpdateItemDto } from "./dto/update-item.dto";
export declare class ItemController {
    private itemService;
    constructor(itemService: ItemService);
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
    allItems(limit: string, offset: string, user: User): Promise<{
        folders: {
            isFavourite: boolean;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            ownerId: number;
            parentId: number | null;
        }[];
        files: {
            isFavourite: boolean;
            item: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                color: string | null;
                ownerId: number;
                parentId: number | null;
            };
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
        children: {
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
