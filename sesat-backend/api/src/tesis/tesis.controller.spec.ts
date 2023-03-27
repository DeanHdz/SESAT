import { Test, TestingModule } from '@nestjs/testing';
import { TesisController } from './tesis.controller';
import { TesisService } from './tesis.service';

describe('TesisController', () => {
  let controller: TesisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TesisController],
      providers: [TesisService],
    }).compile();

    controller = module.get<TesisController>(TesisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
