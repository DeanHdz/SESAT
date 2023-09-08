import { Test, TestingModule } from '@nestjs/testing';
import { ActaEvaluacionService } from './acta-evaluacion.service';

describe('ActaEvaluacionService', () => {
  let service: ActaEvaluacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActaEvaluacionService],
    }).compile();

    service = module.get<ActaEvaluacionService>(ActaEvaluacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
