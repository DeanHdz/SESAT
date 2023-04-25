import { Test, TestingModule } from '@nestjs/testing';
import { FormatosVaciosController } from './formatos-vacios.controller';
import { FormatosVaciosService } from './formatos-vacios.service';

describe('FormatosVaciosController', () => {
  let controller: FormatosVaciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatosVaciosController],
      providers: [FormatosVaciosService],
    }).compile();

    controller = module.get<FormatosVaciosController>(FormatosVaciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
