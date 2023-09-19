import { Test, TestingModule } from '@nestjs/testing';
import { GradoEstudioService } from './grado-estudio.service';

describe('GradoEstudioService', () => {
  let service: GradoEstudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradoEstudioService],
    }).compile();

    service = module.get<GradoEstudioService>(GradoEstudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
