import { Test, TestingModule } from '@nestjs/testing';
import { ComiteController } from './comite.controller';
import { ComiteService } from './comite.service';

describe('ComiteController', () => {
  let controller: ComiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComiteController],
      providers: [ComiteService],
    }).compile();

    controller = module.get<ComiteController>(ComiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
