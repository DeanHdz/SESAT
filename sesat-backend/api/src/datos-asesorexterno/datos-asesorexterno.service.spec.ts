import { Test, TestingModule } from '@nestjs/testing';
import { DatosAsesorexternoService } from './datos-asesorexterno.service';

describe('DatosAsesorexternoService', () => {
  let service: DatosAsesorexternoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosAsesorexternoService],
    }).compile();

    service = module.get<DatosAsesorexternoService>(DatosAsesorexternoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
