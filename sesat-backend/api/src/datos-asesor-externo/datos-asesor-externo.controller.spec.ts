import { Test, TestingModule } from '@nestjs/testing';
import { DatosAsesorexternoController } from './datos-asesor-externo.controller';
import { DatosAsesorexternoService } from './datos-asesor-externo.service';

describe('DatosAsesorexternoController', () => {
  let controller: DatosAsesorexternoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosAsesorexternoController],
      providers: [DatosAsesorexternoService],
    }).compile();

    controller = module.get<DatosAsesorexternoController>(DatosAsesorexternoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
