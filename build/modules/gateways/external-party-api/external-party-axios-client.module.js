"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalPartyAxiosClientModule = void 0;
var tslib_1 = require("tslib");
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var external_party_axios_client_service_1 = require("./external-party-axios-client.service");
var ExternalPartyAxiosClientModule = /** @class */ (function () {
    function ExternalPartyAxiosClientModule() {
    }
    ExternalPartyAxiosClientModule = tslib_1.__decorate([
        (0, common_1.Module)({
            imports: [axios_1.HttpModule],
            providers: [external_party_axios_client_service_1.ExternalPartyAxiosClientService],
            exports: [external_party_axios_client_service_1.ExternalPartyAxiosClientService],
        })
    ], ExternalPartyAxiosClientModule);
    return ExternalPartyAxiosClientModule;
}());
exports.ExternalPartyAxiosClientModule = ExternalPartyAxiosClientModule;
//# sourceMappingURL=external-party-axios-client.module.js.map