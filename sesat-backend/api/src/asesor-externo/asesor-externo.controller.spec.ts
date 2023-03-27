import { Test, TestingModule } from '@nestjs/testing';
import { AsesorExternoController } from './asesor-externo.controller';
import { AsesorExternoService } from './asesor-externo.service';

describe('AsesorExternoController', () => {
  let controller: AsesorExternoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsesorExternoController],
      providers: [AsesorExternoService],
    }).compile();

    controller = module.get<AsesorExternoController>(AsesorExternoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
