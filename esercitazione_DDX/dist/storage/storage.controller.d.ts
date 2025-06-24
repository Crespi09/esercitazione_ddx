import { User } from "@prisma/client";
import { StorageService } from "./storage.service";
export declare class StorageController {
    private storageService;
    constructor(storageService: StorageService);
    userStorage(user: User): Promise<{
        message: string;
        storage: number;
    }>;
}
