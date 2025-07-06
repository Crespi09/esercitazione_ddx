"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBinDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bin_dto_1 = require("./create-bin.dto");
class UpdateBinDto extends (0, mapped_types_1.PartialType)(create_bin_dto_1.CreateBinDto) {
}
exports.UpdateBinDto = UpdateBinDto;
//# sourceMappingURL=update-bin.dto.js.map