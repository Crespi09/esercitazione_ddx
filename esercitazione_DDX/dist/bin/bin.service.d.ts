import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BinService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBinDto, user: User): Promise<void>;
    findAll(user: User): Promise<{
        folders: {
            isInBin: boolean;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            ownerId: number;
            parentId: number | null;
        }[];
        files: {
            isInBin: boolean;
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
    findOne(id: number, user: User): Prisma.Prisma__BinClient<{
        item: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string | null;
            ownerId: number;
            parentId: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        itemId: number;
        userId: number;
        deletedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateBinDto: UpdateBinDto, user: User): string;
    remove(id: number, user: User): Prisma.Prisma__BinClient<{
        id: number;
        createdAt: Date;
        itemId: number;
        userId: number;
        deletedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
