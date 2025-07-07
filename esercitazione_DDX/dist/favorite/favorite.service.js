"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let FavoriteService = class FavoriteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        try {
            if (dto.itemId == null || dto.itemId === '') {
                throw new Error('Item ID is required');
            }
            const favorite = await this.prisma.favorite.create({
                data: {
                    itemId: parseInt(dto.itemId),
                    userId: user.id,
                    createdAt: new Date(),
                },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Elements already exist');
                }
            }
            throw error;
        }
    }
    async findAll(user) {
        try {
            const favorites = await this.prisma.favorite.findMany({
                where: { userId: user.id },
                include: { item: true },
            });
            const favoriteItemIds = favorites.map(fav => fav.itemId);
            const files = await this.prisma.file.findMany({
                where: {
                    itemId: { in: favoriteItemIds },
                },
                include: { item: true },
            });
            const fileFavoriteIds = new Set(files.map(file => file.itemId));
            const folderFavorites = favorites
                .filter(fav => !fileFavoriteIds.has(fav.itemId))
                .map(fav => ({
                ...fav.item,
                isFavourite: true,
            }));
            const fileFavorites = favorites
                .filter(fav => fileFavoriteIds.has(fav.itemId))
                .map(fav => {
                const fileData = files.find(file => file.itemId === fav.itemId);
                return {
                    ...fileData,
                    isFavourite: true,
                };
            });
            return { folders: folderFavorites, files: fileFavorites };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Favorite not found');
                }
            }
            throw error;
        }
    }
    findOne(id, user) {
        try {
            return this.prisma.favorite.findUnique({
                where: { id, userId: user.id },
                include: { item: true },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Favorite not found');
                }
            }
            throw error;
        }
    }
    update(id, updateFavoriteDto, user) {
        return `This action updates a #${id} favorite`;
    }
    remove(id, user) {
        try {
            return this.prisma.favorite.delete({
                where: { userId_itemId: { userId: user.id, itemId: id } },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Favorite not found');
                }
            }
            throw error;
        }
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map