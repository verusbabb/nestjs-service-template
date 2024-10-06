"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const gcp_service_1 = require("./gcp.service");
let GcpModule = class GcpModule {
};
exports.GcpModule = GcpModule;
exports.GcpModule = GcpModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [gcp_service_1.GcpService],
    })
], GcpModule);
//# sourceMappingURL=gcp.module.js.map