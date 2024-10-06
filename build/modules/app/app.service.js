"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
var tslib_1 = require("tslib");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var AppService = /** @class */ (function () {
    function AppService(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    AppService_1 = AppService;
    // async pingDatabase(): Promise<boolean> {
    //   this.logger.debug('[pingDatabase]');
    //   const database_check = await getDatabaseConnection();
    //   return database_check ? true : false;
    // }
    AppService.prototype.healthCheck = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.logger.debug("[healthCheck]");
                try {
                    console.log("health check");
                    return [2 /*return*/, { status: "ok" }];
                }
                catch (e) {
                    this.logger.error("Health check failed", e);
                    throw new common_1.InternalServerErrorException("Health check failed");
                }
                return [2 /*return*/];
            });
        });
    };
    var AppService_1;
    AppService = AppService_1 = tslib_1.__decorate([
        (0, common_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map