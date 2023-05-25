import { Test, TestingModule } from '@nestjs/testing';
import { DatosAsesorExternoService } from './datos-asesor-externo.service';

describe('DatosAsesorExternoService', () => {
  let service: DatosAsesorExternoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosAsesorExternoService],
    }).compile();

    service = module.get<DatosAsesorExternoService>(DatosAsesorExternoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
