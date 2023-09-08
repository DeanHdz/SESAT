import { Test, TestingModule } from '@nestjs/testing';
import { ActaEvaluacionController } from './acta-evaluacion.controller';
import { ActaEvaluacionService } from './acta-evaluacion.service';

describe('ActaEvaluacionController', () => {
  let controller: ActaEvaluacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActaEvaluacionController],
      providers: [ActaEvaluacionService],
    }).compile();

    controller = module.get<ActaEvaluacionController>(ActaEvaluacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
