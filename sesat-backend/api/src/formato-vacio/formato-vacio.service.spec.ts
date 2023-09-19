import { Test, TestingModule } from '@nestjs/testing';
import { FormatosVaciosService } from './formato-vacio.service';

describe('FormatosVaciosService', () => {
  let service: FormatosVaciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormatosVaciosService],
    }).compile();

    service = module.get<FormatosVaciosService>(FormatosVaciosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
