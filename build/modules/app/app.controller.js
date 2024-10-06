"use strict";
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
let AppController = AppController_1 = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    async ping() {
        this.logger.debug(`[ping]`);
        return "Ok";
    }
    async healthCheck() {
        this.logger.debug(`[healthCheck]`);
        return this.appService.healthCheck();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Ping Service" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "OK" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    (0, common_1.Get)("/ping"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "ping", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get Application Health" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "OK" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    (0, common_1.Get)("/health"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "healthCheck", null);
exports.AppController = AppController = AppController_1 = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("App"),
    (0, common_1.Controller)("api/app"),
    tslib_1.__metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map