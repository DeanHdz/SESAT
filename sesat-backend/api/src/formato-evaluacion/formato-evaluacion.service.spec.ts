import { Test, TestingModule } from '@nestjs/testing';
import { FormatoEvaluacionService } from './formato-evaluacion.service';

describe('FormatoEvaluacionService', () => {
  let service: FormatoEvaluacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormatoEvaluacionService],
    }).compile();

    service = module.get<FormatoEvaluacionService>(FormatoEvaluacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
