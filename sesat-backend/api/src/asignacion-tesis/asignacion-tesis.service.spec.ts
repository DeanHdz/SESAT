import { Test, TestingModule } from '@nestjs/testing';
import { AsignacionTesisService } from './asignacion-tesis.service';

describe('AsignacionTesisService', () => {
  let service: AsignacionTesisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsignacionTesisService],
    }).compile();

    service = module.get<AsignacionTesisService>(AsignacionTesisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
