import { Test, TestingModule } from '@nestjs/testing';
import { DatosAlumnoController } from './datos-alumno.controller';
import { DatosAlumnoService } from './datos-alumno.service';

describe('DatosAlumnoController', () => {
  let controller: DatosAlumnoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosAlumnoController],
      providers: [DatosAlumnoService],
    }).compile();

    controller = module.get<DatosAlumnoController>(DatosAlumnoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
