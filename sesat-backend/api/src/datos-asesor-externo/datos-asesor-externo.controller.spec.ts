import { Test, TestingModule } from '@nestjs/testing';
import { DatosAsesorExternoController } from './datos-asesor-externo.controller';
import { DatosAsesorExternoService } from './datos-asesor-externo.service';

describe('DatosAsesorExternoController', () => {
  let controller: DatosAsesorExternoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosAsesorExternoController],
      providers: [DatosAsesorExternoService],
    }).compile();

    controller = module.get<DatosAsesorExternoController>(DatosAsesorExternoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
