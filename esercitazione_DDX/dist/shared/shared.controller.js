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
exports.SharedController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const decorator_1 = require("../auth/decorator");
const shared_service_1 = require("./shared.service");
const share_dto_1 = require("./dto/share.dto");
let SharedController = class SharedController {
    constructor(sharedService) {
        this.sharedService = sharedService;
    }
    addShareItem(dto, user) {
        return this.sharedService.addShareItem(dto, user);
    }
    removeShareItem(id, user) {
        return this.sharedService.removeShareItem(id, user);
    }
};
exports.SharedController = SharedController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [share_dto_1.ShareDto, Object]),
    __metadata("design:returntype", void 0)
], SharedController.prototype, "addShareItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SharedController.prototype, "removeShareItem", null);
exports.SharedController = SharedController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('shared'),
    __metadata("design:paramtypes", [shared_service_1.SharedService])
], SharedController);
//# sourceMappingURL=shared.controller.js.map