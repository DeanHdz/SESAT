import { Test, TestingModule } from '@nestjs/testing';
import { CoAsesorService } from './co-asesor.service';

describe('CoAsesorService', () => {
  let service: CoAsesorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoAsesorService],
    }).compile();

    service = module.get<CoAsesorService>(CoAsesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
