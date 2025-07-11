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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FileService = class FileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveFile(file, dto, user) {
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
            const itemObj = await this.prisma.item.create({
                data: {
                    name: file.originalname,
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
            const fileObj = await this.prisma.file.create({
                data: {
                    fileType: file.mimetype,
                    fileName: file.originalname,
                    storage: file.size,
                    path: file.path,
                    item: {
                        connect: { id: itemObj.id },
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            return {
                message: 'File uploaded successfully',
                item: itemObj,
                file: fileObj,
                user: user.id,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getFileById(id) {
        try {
            const file = await this.prisma.file.findUnique({
                where: { id: parseInt(id) },
            });
            return file;
        }
        catch (error) {
            if (error) {
                throw error;
            }
            throw new Error('File not Found');
        }
    }
    async getFilesByIds(fileIds, user) {
        if (fileIds.length > 0) {
            const numericIds = fileIds.map(id => Number(id));
            try {
                const files = await this.prisma.file.findMany({
                    where: {
                        id: { in: numericIds },
                        item: {
                            ownerId: user.id,
                        },
                    },
                });
                if (!files || files.length === 0) {
                    throw new common_1.NotFoundException('Nessun file trovato per gli ID forniti');
                }
                return files;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async updateFile(id, dto, user) {
        const parentId = parseInt(dto.parentId);
        if (parentId) {
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
            const file = await this.prisma.file.findUnique({
                where: { id: parseInt(id) },
            });
            if (!file) {
                throw new common_1.NotFoundException('File not found');
            }
            const fileUpdated = await this.prisma.file.update({
                where: { id: parseInt(id) },
                data: {
                    fileName: dto.name,
                    updatedAt: new Date(),
                },
            });
            const item = await this.prisma.item.update({
                where: { id: file.itemId },
                data: {
                    ...(dto.name && { name: dto.name }),
                    ...(parentId && {
                        parent: { connect: { id: parentId } },
                    }),
                    updatedAt: new Date(),
                },
            });
            return {
                message: 'Item updated successfully',
                item,
                fileUpdated,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFile(id, user) {
        try {
            const file = await this.prisma.file.findUnique({
                where: { id: parseInt(id) },
            });
            if (!file)
                throw new Error('File not found');
            await this.prisma.file.delete({
                where: { id: parseInt(id) },
            });
            await this.prisma.item.delete({
                where: { id: file.itemId, ownerId: user.id },
            });
            return {
                message: 'File deleted successfully',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FileService);
//# sourceMappingURL=file.service.js.map