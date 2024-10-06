"use strict";
var ExternalPartyAxiosClientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalPartyAxiosClientService = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ExternalPartyAxiosClientService = ExternalPartyAxiosClientService_1 = class ExternalPartyAxiosClientService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(ExternalPartyAxiosClientService_1.name);
        this.baseUrl = '';
        this.baseUrl = this.configService.get('EXTERNAL_PARTY_BASE_URL') ?? 'https://default-value.whatever';
    }
    async exec(path, method, headers, data, params) {
        const url = `${this.baseUrl}${path}`;
        this.logger.debug(`[exec] Making HTTP ${method} call to ${url}`);
        return await this.httpService.axiosRef
            .request({
            url,
            method,
            headers,
            data,
            params,
        })
            .then((response) => {
            return response.data;
        })
            .catch((error) => {
            this.logger.error({
                url: error.response?.config?.url,
                code: error.code,
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
            }, 'Error');
            throw new common_1.HttpException(`${error.response?.data?.error}: ${error.response?.data?.message}`, error.response?.status);
        });
    }
};
exports.ExternalPartyAxiosClientService = ExternalPartyAxiosClientService;
exports.ExternalPartyAxiosClientService = ExternalPartyAxiosClientService = ExternalPartyAxiosClientService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [axios_1.HttpService, config_1.ConfigService])
], ExternalPartyAxiosClientService);
//# sourceMappingURL=external-party-axios-client.service.js.map