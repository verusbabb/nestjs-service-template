"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const experimental_service_1 = require("./experimental.service");
const experimental_controller_1 = require("./experimental.controller");
const config_module_1 = require("../modules/config/config.module");
let ExperimentalModule = class ExperimentalModule {
};
exports.ExperimentalModule = ExperimentalModule;
exports.ExperimentalModule = ExperimentalModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_module_1.ConfigModule],
        controllers: [experimental_controller_1.ExperimentalController],
        providers: [experimental_service_1.ExperimentalService],
    })
], ExperimentalModule);
//# sourceMappingURL=experimental.module.js.map