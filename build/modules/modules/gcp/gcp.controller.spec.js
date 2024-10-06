"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const gcp_controller_1 = require("./gcp.controller");
const gcp_service_1 = require("./gcp.service");
describe('GcpController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [gcp_controller_1.GcpController],
            providers: [gcp_service_1.GcpService],
        }).compile();
        controller = module.get(gcp_controller_1.GcpController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=gcp.controller.spec.js.map