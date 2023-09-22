import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoService } from './periodo.service';

describe('PeriodoService', () => {
  let service: PeriodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodoService],
    }).compile();

    service = module.get<PeriodoService>(PeriodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
