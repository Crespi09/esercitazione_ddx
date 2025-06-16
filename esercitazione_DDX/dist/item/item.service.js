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
            if (dto.parentId) {
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
        const parentId = parseInt(dto.parentId);
        if (!id) {
            throw new common_1.ForbiddenException('Id is required');
        }
        if (!dto.name && !dto.color && !parentId) {
            throw new common_1.ForbiddenException('Name, color or parentId are required');
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
        try {
            const item = await this.prisma.item.update({
                where: { id: parseInt(id) },
                data: {
                    ...(dto.name && { name: dto.name }),
                    ...(dto.color && { color: dto.color }),
                    ...(parentId && {
                        parent: { connect: { id: parentId } },
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
                    }
                },
            });
            return items;
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
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemService);
//# sourceMappingURL=item.service.js.map