import { Test, TestingModule } from '@nestjs/testing';
import { CoAsesorController } from './co-asesor.controller';
import { CoAsesorService } from './co-asesor.service';

describe('CoAsesorController', () => {
  let controller: CoAsesorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoAsesorController],
      providers: [CoAsesorService],
    }).compile();

    controller = module.get<CoAsesorController>(CoAsesorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
