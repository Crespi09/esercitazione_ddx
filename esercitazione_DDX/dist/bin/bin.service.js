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
exports.BinService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let BinService = class BinService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        try {
            if (dto.itemId == null || dto.itemId === '') {
                throw new Error('Item ID is required');
            }
            const favorite = await this.prisma.favorite.findUnique({
                where: { userId_itemId: { userId: user.id, itemId: parseInt(dto.itemId) } },
            });
            if (favorite) {
                await this.prisma.favorite.delete({
                    where: { userId_itemId: { userId: user.id, itemId: parseInt(dto.itemId) } },
                });
            }
            const bin = await this.prisma.bin.create({
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
            const bins = await this.prisma.bin.findMany({
                where: { userId: user.id },
                include: { item: true },
            });
            const binItemIds = bins.map(bin => bin.itemId);
            const files = await this.prisma.file.findMany({
                where: { itemId: { in: binItemIds } },
                include: { item: true },
            });
            const fileBinItemIds = new Set(files.map(file => file.itemId));
            const folderBins = bins
                .filter(bin => !fileBinItemIds.has(bin.itemId))
                .map(bin => ({
                ...bin.item,
                isInBin: true,
            }));
            const fileBins = bins
                .filter(bin => fileBinItemIds.has(bin.itemId))
                .map(bin => {
                const fileData = files.find(file => file.itemId === bin.itemId);
                return {
                    ...fileData,
                    isInBin: true,
                };
            });
            return { folders: folderBins, files: fileBins };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.ForbiddenException('Bin not found');
            }
            throw error;
        }
    }
    findOne(id, user) {
        try {
            return this.prisma.bin.findUnique({
                where: { id, userId: user.id },
                include: { item: true },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Bin not found');
                }
            }
            throw error;
        }
    }
    update(id, updateBinDto, user) {
        return `This action updates a #${id} bin for user ${user.id}`;
    }
    remove(id, user) {
        try {
            return this.prisma.bin.delete({
                where: { userId_itemId: { userId: user.id, itemId: id } },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ForbiddenException('Bin not found');
                }
            }
            throw error;
        }
    }
};
exports.BinService = BinService;
exports.BinService = BinService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BinService);
//# sourceMappingURL=bin.service.js.map