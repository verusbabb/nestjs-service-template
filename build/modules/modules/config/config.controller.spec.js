"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const config_controller_1 = require("./config.controller");
const config_service_1 = require("./config.service");
describe('ConfigController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [config_controller_1.ConfigController],
            providers: [config_service_1.ConfigService],
        }).compile();
        controller = module.get(config_controller_1.ConfigController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=config.controller.spec.js.map