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
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StorageService = class StorageService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async userStorage(user) {
        var storageUsed = 0;
        const items = await this.prisma.item.findMany({
            where: {
                owner: {
                    is: {
                        id: user.id
                    }
                }
            }
        });
        await Promise.all(items.map(async (element) => {
            const file = await this.prisma.file.findUnique({
                where: {
                    itemId: element.id
                }
            });
            if (file) {
                storageUsed += file.storage;
            }
        }));
        return {
            message: 'Total Storage used',
            storage: storageUsed,
        };
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StorageService);
//# sourceMappingURL=storage.service.js.map