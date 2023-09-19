import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadController } from './modalidad.controller';
import { ModalidadService } from './modalidad.service';

describe('ModalidadController', () => {
  let controller: ModalidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModalidadController],
      providers: [ModalidadService],
    }).compile();

    controller = module.get<ModalidadController>(ModalidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
