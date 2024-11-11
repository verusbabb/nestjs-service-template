import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            healthCheck: jest.fn().mockReturnValue("Healthy"),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe("ping", () => {
    it('should return "Ok"', async () => {
      const result = await appController.ping();
      expect(result).toBe("Ok");
    });
  });

  describe("healthCheck", () => {
    it("should return health status from service", async () => {
      const result = await appController.healthCheck();
      expect(appService.healthCheck).toHaveBeenCalled();
      expect(result).toBe("Healthy");
    });
  });
});
