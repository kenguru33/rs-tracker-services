import { Test, TestingModule } from '@nestjs/testing';
import { AisdataCollectedPublisherService } from './aisdata-collected-publisher.service';

describe('AisdataCollectedPublisherService', () => {
  let service: AisdataCollectedPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AisdataCollectedPublisherService],
    }).compile();

    service = module.get<AisdataCollectedPublisherService>(AisdataCollectedPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
