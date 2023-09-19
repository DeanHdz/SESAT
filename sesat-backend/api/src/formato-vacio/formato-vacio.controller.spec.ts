import { Test, TestingModule } from '@nestjs/testing';

import { FormatosVaciosService } from './formatos-vacios.service';
import { formatoVacioController } from './formato-vacio.controller';

describe('FormatosVaciosController', () => {
  let controller: formatoVacioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [formatoVacioController],
      providers: [FormatosVaciosService],
    }).compile();

    controller = module.get<formatoVacioController>(formatoVacioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
