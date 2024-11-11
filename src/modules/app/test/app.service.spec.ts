import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { InternalServerErrorException } from "@nestjs/common";
import { AppService } from "../app.service";

describe("AppService", () => {
  let service: AppService;
  let configService: ConfigService;

  // Mock logger to verify calls
  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    // Create mock ConfigService
    const mockConfigService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);

    // Directly set the mock logger
    Object.defineProperty(service, "logger", {
      value: mockLogger,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("healthCheck", () => {
    it("should return healthy status with service name", async () => {
      // Arrange
      const serviceName = "TestService";
      jest.spyOn(configService, "get").mockReturnValue(serviceName);

      // Act
      const result = await service.healthCheck();

      // Assert
      expect(result).toBe(`${serviceName} is Alive and Healthy`);
      expect(mockLogger.log).toHaveBeenCalledWith("[healthCheck]");
      expect(configService.get).toHaveBeenCalledWith("FRIENDLY_NAME");
    });

    it("should throw InternalServerErrorException when config service fails", async () => {
      // Arrange
      jest.spyOn(configService, "get").mockImplementation(() => {
        throw new Error("Config error");
      });

      // Act & Assert
      await expect(service.healthCheck()).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockLogger.error).toHaveBeenCalled();
    });

    // TODO: Add tests for other edge cases
    // TODO: Add tests for different config values
    // TODO: Add tests for logger behavior in different scenarios
  });
});
