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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinController = void 0;
const common_1 = require("@nestjs/common");
const bin_service_1 = require("./bin.service");
const create_bin_dto_1 = require("./dto/create-bin.dto");
const update_bin_dto_1 = require("./dto/update-bin.dto");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
let BinController = class BinController {
    constructor(binService) {
        this.binService = binService;
    }
    create(createBinDto, user) {
        return this.binService.create(createBinDto, user);
    }
    findAll(user) {
        return this.binService.findAll(user);
    }
    findOne(id, user) {
        return this.binService.findOne(+id, user);
    }
    update(id, updateBinDto, user) {
        return this.binService.update(+id, updateBinDto, user);
    }
    remove(id, user) {
        return this.binService.remove(+id, user);
    }
};
exports.BinController = BinController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bin_dto_1.CreateBinDto, Object]),
    __metadata("design:returntype", void 0)
], BinController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BinController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BinController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bin_dto_1.UpdateBinDto, Object]),
    __metadata("design:returntype", void 0)
], BinController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BinController.prototype, "remove", null);
exports.BinController = BinController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('bin'),
    __metadata("design:paramtypes", [bin_service_1.BinService])
], BinController);
//# sourceMappingURL=bin.controller.js.map