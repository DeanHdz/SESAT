import { Test, TestingModule } from '@nestjs/testing';
import { AsesorController } from './asesor.controller';
import { AsesorService } from './asesor.service';

describe('AsesorController', () => {
  let controller: AsesorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsesorController],
      providers: [AsesorService],
    }).compile();

    controller = module.get<AsesorController>(AsesorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
