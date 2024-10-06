"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalPartyAxiosClientService = void 0;
var tslib_1 = require("tslib");
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var ExternalPartyAxiosClientService = /** @class */ (function () {
    function ExternalPartyAxiosClientService(httpService, configService) {
        var _a;
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(ExternalPartyAxiosClientService_1.name);
        this.baseUrl = '';
        this.baseUrl = (_a = this.configService.get('EXTERNAL_PARTY_BASE_URL')) !== null && _a !== void 0 ? _a : 'https://default-value.whatever';
    }
    ExternalPartyAxiosClientService_1 = ExternalPartyAxiosClientService;
    ExternalPartyAxiosClientService.prototype.exec = function (path, method, headers, data, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.baseUrl).concat(path);
                        this.logger.debug("[exec] Making HTTP ".concat(method, " call to ").concat(url));
                        return [4 /*yield*/, this.httpService.axiosRef
                                .request({
                                url: url,
                                method: method,
                                headers: headers,
                                data: data,
                                params: params,
                            })
                                .then(function (response) {
                                return response.data;
                            })
                                .catch(function (error) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                                _this.logger.error({
                                    url: (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.url,
                                    code: error.code,
                                    message: error.message,
                                    status: (_c = error.response) === null || _c === void 0 ? void 0 : _c.status,
                                    statusText: (_d = error.response) === null || _d === void 0 ? void 0 : _d.statusText,
                                    data: (_e = error.response) === null || _e === void 0 ? void 0 : _e.data,
                                }, 'Error');
                                throw new common_1.HttpException("".concat((_g = (_f = error.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.error, ": ").concat((_j = (_h = error.response) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.message), (_k = error.response) === null || _k === void 0 ? void 0 : _k.status);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var ExternalPartyAxiosClientService_1;
    ExternalPartyAxiosClientService = ExternalPartyAxiosClientService_1 = tslib_1.__decorate([
        (0, common_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [axios_1.HttpService, config_1.ConfigService])
    ], ExternalPartyAxiosClientService);
    return ExternalPartyAxiosClientService;
}());
exports.ExternalPartyAxiosClientService = ExternalPartyAxiosClientService;
//# sourceMappingURL=external-party-axios-client.service.js.map