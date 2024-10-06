"use strict";
var GcpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const secret_manager_1 = require("@google-cloud/secret-manager");
let GcpService = GcpService_1 = class GcpService {
    constructor() {
        this.logger = new common_1.Logger(GcpService_1.name);
        // Initialize the Google Cloud Secret Manager client
        this.client = new secret_manager_1.SecretManagerServiceClient();
    }
    async getSecretValue(secretName) {
        try {
            const [version] = await this.client.accessSecretVersion({
                name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${secretName}/versions/latest`,
            });
            const secret = version.payload?.data?.toString();
            return secret || undefined;
        }
        catch (error) {
            this.logger.error(`Failed to fetch secret ${secretName}: ${error.message}`);
            return undefined;
        }
    }
};
exports.GcpService = GcpService;
exports.GcpService = GcpService = GcpService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], GcpService);
//# sourceMappingURL=gcp.service.js.map