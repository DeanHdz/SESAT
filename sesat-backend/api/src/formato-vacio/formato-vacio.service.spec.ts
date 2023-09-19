import { Test, TestingModule } from '@nestjs/testing';
import { FormatoVacioService } from './formato-vacio.service';

describe('FormatosVaciosService', () => {
  let service: FormatoVacioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormatoVacioService],
    }).compile();

    service = module.get<FormatoVacioService>(FormatoVacioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
