import { HttpStatus } from "@nestjs/common";
import { User } from "@prisma/client";
import { SharedService } from "./shared.service";
import { ShareDto } from "./dto/share.dto";
export declare class SharedController {
    private sharedService;
    constructor(sharedService: SharedService);
    addShareItem(dto: ShareDto, user: User): Promise<void>;
    removeShareItem(id: string, user: User): Promise<HttpStatus>;
    allItems(limit: string, offset: string, user: User): Promise<{
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
    singleItem(id: string, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        itemId: number;
        sharedWithId: number;
    }>;
}
