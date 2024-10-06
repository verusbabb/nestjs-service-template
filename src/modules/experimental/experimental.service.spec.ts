import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentalService } from './experimental.service';

describe('ExperimentalService', () => {
  let service: ExperimentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperimentalService],
    }).compile();

    service = module.get<ExperimentalService>(ExperimentalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
