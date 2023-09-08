import { Test, TestingModule } from '@nestjs/testing';
import { VariablesSistemaService } from './variables-sistema.service';

describe('VariablesSistemaService', () => {
  let service: VariablesSistemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariablesSistemaService],
    }).compile();

    service = module.get<VariablesSistemaService>(VariablesSistemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
