"use strict";
var CustomConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConfigService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const gcp_service_1 = require("../gcp/gcp.service"); // Import GcpSecretService
let CustomConfigService = CustomConfigService_1 = class CustomConfigService extends config_1.ConfigService {
    constructor(gcpService) {
        super();
        this.gcpService = gcpService;
        this.logger = new common_1.Logger(CustomConfigService_1.name);
    }
    async get(key) {
        // First, check environment variables
        const envValue = super.get(key);
        if (envValue) {
            return envValue;
        }
        // If not found, try fetching from GCP Secret Manager
        try {
            const secretValue = await this.gcpService.getSecretValue(key);
            return secretValue;
        }
        catch (error) {
            this.logger.error(`Error retrieving key "${key}" from Secret Manager: ${error.message}`);
            return undefined;
        }
    }
};
exports.CustomConfigService = CustomConfigService;
exports.CustomConfigService = CustomConfigService = CustomConfigService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [gcp_service_1.GcpService])
], CustomConfigService);
//# sourceMappingURL=config.service.js.map