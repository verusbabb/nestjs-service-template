"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_service_1 = require("../modules/config/config.service");
let ExperimentalService = class ExperimentalService {
    constructor(configService) {
        this.configService = configService;
    } // Inject ConfigService
    async getSecretValue() {
        // Use the ConfigService to fetch the secret from GCP Secret Manager or environment variables
        const secretValue = await this.configService.get("POSTGRES_HOST");
        console.log("POSTGRES_HOST", this.configService.get("POSTGRES_HOST"));
        // Check if the secret was successfully retrieved
        if (!secretValue) {
            throw new Error("Secret not found");
        }
        return secretValue;
    }
    create(createExperimentalDto) {
        return "This action adds a new experimental";
    }
    findAll() {
        return `This action returns all experimental`;
    }
    findOne(id) {
        return `This action returns a #${id} experimental`;
    }
    update(id, updateExperimentalDto) {
        return `This action updates a #${id} experimental`;
    }
    remove(id) {
        return `This action removes a #${id} experimental`;
    }
};
exports.ExperimentalService = ExperimentalService;
exports.ExperimentalService = ExperimentalService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_service_1.CustomConfigService])
], ExperimentalService);
//# sourceMappingURL=experimental.service.js.map