import { PrismaService } from "src/prisma/prisma.service";
import { FolderDto } from "./dto/folder.dto";
import { User } from "@prisma/client";
export declare class FolderService {
    private prisma;
    constructor(prisma: PrismaService);
    createFolder(dto: FolderDto, user: User): Promise<void>;
}
