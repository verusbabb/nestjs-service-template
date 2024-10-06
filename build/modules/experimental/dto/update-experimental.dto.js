"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExperimentalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_experimental_dto_1 = require("./create-experimental.dto");
class UpdateExperimentalDto extends (0, swagger_1.PartialType)(create_experimental_dto_1.CreateExperimentalDto) {
}
exports.UpdateExperimentalDto = UpdateExperimentalDto;
//# sourceMappingURL=update-experimental.dto.js.map