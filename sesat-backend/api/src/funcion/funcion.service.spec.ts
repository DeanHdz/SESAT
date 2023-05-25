import { Test, TestingModule } from '@nestjs/testing';
import { FuncionService } from './funcion.service';

describe('FuncionService', () => {
  let service: FuncionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionService],
    }).compile();

    service = module.get<FuncionService>(FuncionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
