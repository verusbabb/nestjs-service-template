"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const app_controller_1 = require("./app/app.controller");
const app_service_1 = require("./app/app.service");
const gcp_module_1 = require("./modules/gcp/gcp.module");
const config_module_1 = require("./modules/config/config.module"); // Import your custom ConfigModule
let AppModule = class AppModule {
    configure(consumer) {
        // https://docs.nestjs.com/middleware#excluding-routes
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule, // Your custom ConfigModule that uses CustomConfigService
            axios_1.HttpModule,
            gcp_module_1.GcpModule, // GCP-related logic
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map