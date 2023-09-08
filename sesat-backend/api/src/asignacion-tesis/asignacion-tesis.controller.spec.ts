import { Test, TestingModule } from '@nestjs/testing';
import { AsignacionTesisController } from './asignacion-tesis.controller';
import { AsignacionTesisService } from './asignacion-tesis.service';

describe('AsignacionTesisController', () => {
  let controller: AsignacionTesisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsignacionTesisController],
      providers: [AsignacionTesisService],
    }).compile();

    controller = module.get<AsignacionTesisController>(AsignacionTesisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
