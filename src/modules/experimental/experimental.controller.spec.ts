import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentalController } from './experimental.controller';
import { ExperimentalService } from './experimental.service';

describe('ExperimentalController', () => {
  let controller: ExperimentalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentalController],
      providers: [ExperimentalService],
    }).compile();

    controller = module.get<ExperimentalController>(ExperimentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
