"use strict";
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppService = AppService_1 = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    // async pingDatabase(): Promise<boolean> {
    //   this.logger.debug('[pingDatabase]');
    //   const database_check = await getDatabaseConnection();
    //   return database_check ? true : false;
    // }
    async healthCheck() {
        this.logger.debug("[healthCheck]");
        try {
            console.log("health check");
            return { status: "ok" };
        }
        catch (e) {
            this.logger.error("Health check failed", e);
            throw new common_1.InternalServerErrorException("Health check failed");
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map