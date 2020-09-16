import { Test, TestingModule } from '@nestjs/testing';
import { AisdataCreatedEventPublisherService } from './aisdata-created-event-publisher.service';

describe('AisdataCreatedEventPublisherService', () => {
  let service: AisdataCreatedEventPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AisdataCreatedEventPublisherService],
    }).compile();

    service = module.get<AisdataCreatedEventPublisherService>(AisdataCreatedEventPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
