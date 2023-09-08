import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaService } from './programa.service';

describe('ProgramaService', () => {
  let service: ProgramaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramaService],
    }).compile();

    service = module.get<ProgramaService>(ProgramaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
