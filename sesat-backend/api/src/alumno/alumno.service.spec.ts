import { Test, TestingModule } from '@nestjs/testing';
import { AlumnoService } from './alumno.service';

describe('AlumnoService', () => {
  let service: AlumnoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlumnoService],
    }).compile();

    service = module.get<AlumnoService>(AlumnoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
