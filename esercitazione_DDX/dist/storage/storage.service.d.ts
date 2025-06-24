import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
export declare class StorageService {
    private prisma;
    constructor(prisma: PrismaService);
    userStorage(user: User): Promise<{
        message: string;
        storage: number;
    }>;
}
