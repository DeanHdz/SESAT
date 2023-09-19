import { Test, TestingModule } from '@nestjs/testing';
import { GradoEstudioController } from './grado-estudio.controller';
import { GradoEstudioService } from './grado-estudio.service';

describe('GradoEstudioController', () => {
  let controller: GradoEstudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradoEstudioController],
      providers: [GradoEstudioService],
    }).compile();

    controller = module.get<GradoEstudioController>(GradoEstudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
