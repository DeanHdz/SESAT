import { Test, TestingModule } from '@nestjs/testing';
import { TesisService } from './tesis.service';

describe('TesisService', () => {
  let service: TesisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesisService],
    }).compile();

    service = module.get<TesisService>(TesisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
