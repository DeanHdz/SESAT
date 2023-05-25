import { Test, TestingModule } from '@nestjs/testing';
import { DatosAlumnoService } from './datos-alumno.service';

describe('DatosAlumnoService', () => {
  let service: DatosAlumnoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosAlumnoService],
    }).compile();

    service = module.get<DatosAlumnoService>(DatosAlumnoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
