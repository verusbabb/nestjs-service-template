"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const experimental_service_1 = require("./experimental.service");
describe('ExperimentalService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [experimental_service_1.ExperimentalService],
        }).compile();
        service = module.get(experimental_service_1.ExperimentalService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=experimental.service.spec.js.map