import { Test, TestingModule } from '@nestjs/testing';
import { FormatoEvaluacionController } from './formato-evaluacion.controller';
import { FormatoEvaluacionService } from './formato-evaluacion.service';

describe('FormatoEvaluacionController', () => {
  let controller: FormatoEvaluacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatoEvaluacionController],
      providers: [FormatoEvaluacionService],
    }).compile();

    controller = module.get<FormatoEvaluacionController>(FormatoEvaluacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
