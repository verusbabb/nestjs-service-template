"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
let ConfigController = class ConfigController {
    constructor(configService) {
        this.configService = configService;
    }
};
exports.ConfigController = ConfigController;
exports.ConfigController = ConfigController = tslib_1.__decorate([
    (0, common_1.Controller)("config"),
    tslib_1.__metadata("design:paramtypes", [config_service_1.CustomConfigService])
], ConfigController);
//# sourceMappingURL=config.controller.js.map