import { Test, TestingModule } from '@nestjs/testing';
import { AsesorService } from './asesor.service';

describe('AsesorService', () => {
  let service: AsesorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsesorService],
    }).compile();

    service = module.get<AsesorService>(AsesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
