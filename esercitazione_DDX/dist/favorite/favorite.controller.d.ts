import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { User } from '@prisma/client';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    create(createFavoriteDto: CreateFavoriteDto, user: User): Promise<void>;
    findAll(user: User): Promise<{
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
    findOne(id: string, user: User): import(".prisma/client").Prisma.Prisma__FavoriteClient<{
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
    update(id: string, updateFavoriteDto: UpdateFavoriteDto, user: User): string;
    remove(id: string, user: User): import(".prisma/client").Prisma.Prisma__FavoriteClient<{
        id: number;
        createdAt: Date;
        itemId: number;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
