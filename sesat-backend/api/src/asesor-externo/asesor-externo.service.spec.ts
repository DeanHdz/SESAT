import { Test, TestingModule } from '@nestjs/testing';
import { AsesorExternoService } from './asesor-externo.service';

describe('AsesorExternoService', () => {
  let service: AsesorExternoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsesorExternoService],
    }).compile();

    service = module.get<AsesorExternoService>(AsesorExternoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
