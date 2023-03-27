import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaController } from './programa.controller';
import { ProgramaService } from './programa.service';

describe('ProgramaController', () => {
  let controller: ProgramaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaController],
      providers: [ProgramaService],
    }).compile();

    controller = module.get<ProgramaController>(ProgramaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
