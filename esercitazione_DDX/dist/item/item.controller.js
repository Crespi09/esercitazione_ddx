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
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const item_service_1 = require("./item.service");
const item_dto_1 = require("./dto/item.dto");
const decorator_1 = require("../auth/decorator");
const update_item_dto_1 = require("./dto/update-item.dto");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    createItem(dto, user) {
        return this.itemService.createItem(dto, user);
    }
    updateItem(id, dto) {
        return this.itemService.updateItem(id, dto);
    }
    deleteItem(id) {
        return this.itemService.deleteItem(id);
    }
    allItems(limit, offset) {
        return this.itemService.allItems(parseInt(limit), parseInt(offset));
    }
    singleItem(id) {
        return this.itemService.singleItem(id);
    }
};
exports.ItemController = ItemController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_dto_1.ItemDto, Object]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "createItem", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)('all/:limit/:offset'),
    __param(0, (0, common_1.Param)('limit')),
    __param(1, (0, common_1.Param)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "allItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "singleItem", null);
exports.ItemController = ItemController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('item'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
//# sourceMappingURL=item.controller.js.map