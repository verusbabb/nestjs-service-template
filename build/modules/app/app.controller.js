"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
var tslib_1 = require("tslib");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var app_service_1 = require("./app.service");
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    AppController_1 = AppController;
    AppController.prototype.ping = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.logger.debug("[ping]");
                return [2 /*return*/, "Ok"];
            });
        });
    };
    AppController.prototype.healthCheck = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.logger.debug("[healthCheck]");
                return [2 /*return*/, this.appService.healthCheck()];
            });
        });
    };
    var AppController_1;
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
    AppController = AppController_1 = tslib_1.__decorate([
        (0, swagger_1.ApiTags)("App"),
        (0, common_1.Controller)("api/app"),
        tslib_1.__metadata("design:paramtypes", [app_service_1.AppService])
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map