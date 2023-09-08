import { Test, TestingModule } from '@nestjs/testing';
import { VariablesSistemaController } from './variables-sistema.controller';
import { VariablesSistemaService } from './variables-sistema.service';

describe('VariablesSistemaController', () => {
  let controller: VariablesSistemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariablesSistemaController],
      providers: [VariablesSistemaService],
    }).compile();

    controller = module.get<VariablesSistemaController>(VariablesSistemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
