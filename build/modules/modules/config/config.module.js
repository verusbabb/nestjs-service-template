"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const gcp_module_1 = require("../gcp/gcp.module"); // Import the GcpModule
const config_service_1 = require("./config.service");
let ConfigModule = class ConfigModule {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true, // Make ConfigModule global so that ConfigService is available everywhere
            }),
            gcp_module_1.GcpModule, // Import GcpModule to use GcpSecretService within CustomConfigService
        ],
        providers: [
            {
                provide: config_1.ConfigService,
                useClass: config_service_1.CustomConfigService, // Provide the CustomConfigService as the default ConfigService
            },
        ],
        exports: [config_1.ConfigService], // Export ConfigService for other modules
    })
], ConfigModule);
//# sourceMappingURL=config.module.js.map