import { FolderService } from "./folder.service";
import { FolderDto } from "./dto/folder.dto";
import { User } from "@prisma/client";
export declare class FolderController {
    private folderService;
    constructor(folderService: FolderService);
    createFolder(dto: FolderDto, user: User): Promise<void>;
    updateFolder(dto: FolderDto): void;
    deleteFolder(dto: FolderDto): void;
    allFolders(): void;
    singleFolder(): void;
}
