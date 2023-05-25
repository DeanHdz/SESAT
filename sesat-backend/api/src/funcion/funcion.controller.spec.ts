import { Test, TestingModule } from '@nestjs/testing';
import { FuncionController } from './funcion.controller';
import { FuncionService } from './funcion.service';

describe('FuncionController', () => {
  let controller: FuncionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionController],
      providers: [FuncionService],
    }).compile();

    controller = module.get<FuncionController>(FuncionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
