import { HttpStatus } from "@nestjs/common";
import { User } from "@prisma/client";
import { SharedService } from "./shared.service";
import { ShareDto } from "./dto/share.dto";
export declare class SharedController {
    private sharedService;
    constructor(sharedService: SharedService);
    addShareItem(dto: ShareDto, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        itemId: number;
        sharedWithId: number;
    }>;
    removeShareItem(id: string, user: User): Promise<HttpStatus>;
}
