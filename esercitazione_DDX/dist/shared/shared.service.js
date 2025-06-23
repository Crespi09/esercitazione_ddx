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
exports.SharedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let SharedService = class SharedService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addShareItem(dto, user) {
        if (!dto.item_id || !dto.shared_with_id) {
            throw new common_1.ForbiddenException('item_id e shared_with_id sono obbligatori');
        }
        try {
            const itemId = parseInt(dto.item_id);
            if (isNaN(itemId)) {
                throw new common_1.ForbiddenException('item_id deve essere un numero valido');
            }
            const itemExists = await this.prisma.item.findUnique({
                where: { id: itemId },
            });
            if (!itemExists) {
                throw new common_1.NotFoundException(`Item con ID ${itemId} non trovato`);
            }
            if (itemExists.ownerId !== user.id) {
                throw new common_1.ForbiddenException('Non hai i permessi per condividere questo item');
            }
            const sharedWithId = parseInt(dto.shared_with_id);
            if (isNaN(sharedWithId)) {
                throw new common_1.ForbiddenException('shared_with_id deve essere un numero valido');
            }
            const share = await this.prisma.shared.create({
                data: {
                    item: { connect: { id: itemId } },
                    sharedWith: { connect: { id: sharedWithId } },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            return share;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Condivisione già esistente');
                }
            }
            throw error;
        }
    }
    async removeShareItem(sharedId, user) {
        const shared = await this.prisma.shared.findUnique({
            where: { id: parseInt(sharedId) }
        });
        if (!shared) {
            throw new common_1.NotFoundException('Condivisione non trovata');
        }
        const item = await this.prisma.item.findUnique({
            where: { id: shared.itemId }
        });
        if (shared.sharedWithId !== user.id && item.ownerId !== user.id) {
            throw new common_1.ForbiddenException('Non hai i permessi per rimuovere questa condivisione');
        }
        await this.prisma.shared.delete({
            where: { id: parseInt(sharedId) }
        });
        return common_1.HttpStatus.NO_CONTENT;
    }
};
exports.SharedService = SharedService;
exports.SharedService = SharedService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SharedService);
//# sourceMappingURL=shared.service.js.map