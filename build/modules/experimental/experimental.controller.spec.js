"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const experimental_controller_1 = require("./experimental.controller");
const experimental_service_1 = require("./experimental.service");
describe('ExperimentalController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [experimental_controller_1.ExperimentalController],
            providers: [experimental_service_1.ExperimentalService],
        }).compile();
        controller = module.get(experimental_controller_1.ExperimentalController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=experimental.controller.spec.js.map