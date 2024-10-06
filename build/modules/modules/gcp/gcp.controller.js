"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const gcp_service_1 = require("./gcp.service");
let GcpController = class GcpController {
    constructor(gcpService) {
        this.gcpService = gcpService;
    }
};
exports.GcpController = GcpController;
exports.GcpController = GcpController = tslib_1.__decorate([
    (0, common_1.Controller)('gcp'),
    tslib_1.__metadata("design:paramtypes", [gcp_service_1.GcpService])
], GcpController);
//# sourceMappingURL=gcp.controller.js.map