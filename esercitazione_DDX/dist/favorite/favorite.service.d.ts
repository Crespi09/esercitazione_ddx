import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class FavoriteService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFavoriteDto, user: User): Promise<void>;
    findAll(user: User): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    findOne(id: number, user: User): import(".prisma/client").Prisma.Prisma__FavoriteClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateFavoriteDto: UpdateFavoriteDto, user: User): string;
    remove(id: number, user: User): import(".prisma/client").Prisma.Prisma__FavoriteClient<{
        id: number;
        createdAt: Date;
        itemId: number;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
