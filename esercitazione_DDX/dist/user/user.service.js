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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserById(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Utente con ID ${userId} non trovato`);
        }
        return user;
    }
    async updateUser(userId, dto) {
        await this.findUserById(userId);
        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...dto,
            },
        });
    }
    async deleteUser(userId) {
        await this.findUserById(userId);
        await this.prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }
    async getItemsCount(userId) {
        await this.findUserById(userId);
        const totalItems = await this.prisma.item.count({
            where: {
                ownerId: userId,
            }
        });
        const nFiles = await this.prisma.item.count({
            where: {
                ownerId: userId,
                file: {
                    isNot: null
                }
            }
        });
        const nFolder = totalItems - nFiles;
        return {
            totalItems,
            nFolder,
            nFiles
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map