"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const config_service_1 = require("./config.service");
describe('ConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [config_service_1.ConfigService],
        }).compile();
        service = module.get(config_service_1.ConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=config.service.spec.js.map