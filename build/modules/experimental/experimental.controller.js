"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const experimental_service_1 = require("./experimental.service");
const create_experimental_dto_1 = require("./dto/create-experimental.dto");
const update_experimental_dto_1 = require("./dto/update-experimental.dto");
let ExperimentalController = class ExperimentalController {
    constructor(experimentalService) {
        this.experimentalService = experimentalService;
    }
    async getSecretValue() {
        return this.experimentalService.getSecretValue();
    }
    create(createExperimentalDto) {
        return this.experimentalService.create(createExperimentalDto);
    }
    findAll() {
        return this.experimentalService.findAll();
    }
    findOne(id) {
        return this.experimentalService.findOne(+id);
    }
    update(id, updateExperimentalDto) {
        return this.experimentalService.update(+id, updateExperimentalDto);
    }
    remove(id) {
        return this.experimentalService.remove(+id);
    }
};
exports.ExperimentalController = ExperimentalController;
tslib_1.__decorate([
    (0, common_1.Get)("/secret"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ExperimentalController.prototype, "getSecretValue", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_experimental_dto_1.CreateExperimentalDto]),
    tslib_1.__metadata("design:returntype", void 0)
], ExperimentalController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ExperimentalController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ExperimentalController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, update_experimental_dto_1.UpdateExperimentalDto]),
    tslib_1.__metadata("design:returntype", void 0)
], ExperimentalController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ExperimentalController.prototype, "remove", null);
exports.ExperimentalController = ExperimentalController = tslib_1.__decorate([
    (0, common_1.Controller)("experimental"),
    tslib_1.__metadata("design:paramtypes", [experimental_service_1.ExperimentalService])
], ExperimentalController);
//# sourceMappingURL=experimental.controller.js.map