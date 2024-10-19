import { TestingModule } from '@nestjs/testing';
import { CustomLogger } from './logger.service';
import { SharedTestingModule } from '../shared-testing.module';

describe('LoggerService', () => {
  let service: CustomLogger;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<CustomLogger>(CustomLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
