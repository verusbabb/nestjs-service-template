"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const gcp_service_1 = require("./gcp.service");
describe('GcpService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [gcp_service_1.GcpService],
        }).compile();
        service = module.get(gcp_service_1.GcpService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=gcp.service.spec.js.map