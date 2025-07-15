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
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let ItemService = class ItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createItem(dto, user) {
        try {
            if (dto.parentId != null && dto.parentId !== '') {
                const parentId = parseInt(dto.parentId);
                if (isNaN(parentId)) {
                    throw new common_1.ForbiddenException('Parent ID deve essere un numero valido');
                }
                const parentExists = await this.prisma.item.findUnique({
                    where: { id: parentId },
                });
                if (!parentExists) {
                    throw new common_1.NotFoundException(`Parent con ID ${parentId} non trovato`);
                }
                if (parentExists.ownerId !== user.id) {
                    throw new common_1.ForbiddenException('Non hai i permessi per utilizzare questo parent');
                }
            }
            const item = await this.prisma.item.create({
                data: {
                    name: dto.name,
                    color: dto.color,
                    ...(dto.parentId
                        ? {
                            parent: {
                                connect: {
                                    id: parseInt(dto.parentId)
                                        ? parseInt(dto.parentId)
                                        : undefined,
                                },
                            },
                        }
                        : {}),
                    owner: { connect: { id: user.id } },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    async updateItem(id, dto, user) {
        if (!id) {
            throw new common_1.ForbiddenException('Id is required');
        }
        if (!dto.name && !dto.color && !dto.hasOwnProperty('parentId')) {
            throw new common_1.ForbiddenException('Name, color or parentId are required');
        }
        if (dto.parentId != null && dto.parentId !== '') {
            const parentId = parseInt(dto.parentId);
            if (isNaN(parentId)) {
                throw new common_1.ForbiddenException('Parent ID deve essere un numero valido');
            }
            const parentExists = await this.prisma.item.findUnique({
                where: { id: parentId },
            });
            if (!parentExists) {
                throw new common_1.NotFoundException(`Parent con ID ${parentId} non trovato`);
            }
            if (parentExists.ownerId !== user.id) {
                throw new common_1.ForbiddenException('Non hai i permessi per utilizzare questo parent');
            }
        }
        try {
            const item = await this.prisma.item.update({
                where: { id: parseInt(id) },
                data: {
                    ...(dto.name && { name: dto.name }),
                    ...(dto.color && { color: dto.color }),
                    ...(dto.hasOwnProperty('parentId') && {
                        ...(dto.parentId
                            ? {
                                parent: {
                                    connect: {
                                        id: parseInt(dto.parentId),
                                    },
                                },
                            }
                            : { parentId: null }),
                    }),
                    updatedAt: new Date(),
                },
            });
            return item;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Item not found');
                }
            }
            throw error;
        }
    }
    async deleteItem(id, user) {
        if (!id) {
            throw new common_1.ForbiddenException('Id is required');
        }
        try {
            const item = await this.prisma.item.delete({
                where: {
                    id: parseInt(id), owner: {
                        is: {
                            id: user.id,
                        }
                    }
                },
            });
            return item;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Item not found');
                }
            }
            throw error;
        }
    }
    async getItemsByIds(itemIds, user) {
        if (itemIds.length > 0) {
            const numericIds = itemIds.map(id => Number(id));
            try {
                const item = await this.prisma.item.findMany({
                    where: {
                        id: { in: numericIds },
                        ownerId: user.id,
                    },
                });
                if (!item || item.length === 0) {
                    throw new common_1.NotFoundException('Nessun item trovato per gli ID forniti');
                }
                return item;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async allItems(limit, offset, user) {
        if (limit === undefined || limit === null || offset === undefined || offset === null) {
            throw new common_1.ForbiddenException('Limit and offset are required');
        }
        if (limit <= 0) {
            throw new common_1.ForbiddenException('Limit must be greater than 0');
        }
        if (offset < 0) {
            throw new common_1.ForbiddenException('Offset must be greater than or equal to 0');
        }
        try {
            const items = await this.prisma.item.findMany({
                take: limit,
                skip: offset,
                orderBy: { createdAt: 'desc' },
                where: {
                    owner: {
                        is: {
                            id: user.id,
                        }
                    },
                    parentId: null,
                    binItems: {
                        none: {
                            userId: user.id,
                        },
                    },
                },
            });
            const itemFileIds = [];
            const itemFolderIds = [];
            await Promise.all(items.map(async (element) => {
                const file = await this.prisma.file.findUnique({
                    where: {
                        itemId: element.id,
                    },
                });
                if (file) {
                    console.log('sono un file : ', element);
                    console.log('con Id:', file.itemId);
                    itemFileIds.push(file.itemId);
                }
                else {
                    console.log('sono una cartella : ', element);
                    console.log('con Id:', element.id);
                    itemFolderIds.push(element.id);
                }
            }));
            const userFavorites = await this.prisma.favorite.findMany({
                where: {
                    userId: user.id,
                    itemId: {
                        in: [...itemFileIds, ...itemFolderIds],
                    },
                },
            });
            const favoriteItemIds = new Set(userFavorites.map(fav => fav.itemId));
            const itemsFolder = await this.prisma.item.findMany({
                where: {
                    id: {
                        in: itemFolderIds,
                    },
                    owner: {
                        is: {
                            id: user.id,
                        }
                    }
                },
            });
            const itemsFile = await this.prisma.file.findMany({
                where: {
                    itemId: {
                        in: itemFileIds,
                    },
                },
                include: {
                    item: true,
                },
            });
            const foldersWithFavorites = itemsFolder.map(folder => ({
                ...folder,
                isFavourite: favoriteItemIds.has(folder.id),
            }));
            const filesWithFavorites = itemsFile.map(file => ({
                ...file,
                isFavourite: favoriteItemIds.has(file.itemId),
            }));
            return {
                folders: foldersWithFavorites,
                files: filesWithFavorites,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async singleItem(id, user) {
        if (!id) {
            throw new common_1.ForbiddenException('Id is required');
        }
        try {
            const item = await this.prisma.item.findUnique({
                where: {
                    id: parseInt(id),
                    ownerId: user.id
                },
            });
            const itemSons = await this.prisma.item.findMany({
                where: {
                    parentId: parseInt(id),
                    ownerId: user.id,
                },
            });
            const childrenFile = await this.prisma.file.findMany({
                where: {
                    itemId: {
                        in: itemSons.map((son) => son.id),
                    },
                },
            });
            const childrenFolder = itemSons.filter(son => !childrenFile.some(file => file.itemId === son.id));
            const favoriteItems = await this.prisma.favorite.findMany({
                where: {
                    userId: user.id,
                    itemId: {
                        in: itemSons.map(son => son.id),
                    },
                },
            });
            const childrenFolderFavorites = childrenFolder.map(folder => ({
                ...folder,
                isFavourite: favoriteItems.some(fav => fav.itemId === folder.id),
            }));
            const childrenFileFavorites = childrenFile.map(file => ({
                ...file,
                isFavourite: favoriteItems.some(fav => fav.itemId === file.itemId),
            }));
            console.log(item, childrenFileFavorites, childrenFolderFavorites);
            return {
                item,
                children: {
                    files: childrenFileFavorites,
                    folders: childrenFolderFavorites,
                },
            };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Item not found');
                }
            }
            throw error;
        }
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemService);
//# sourceMappingURL=item.service.js.map