import { Test, TestingModule } from '@nestjs/testing';
import { ComiteService } from './comite.service';

describe('ComiteService', () => {
  let service: ComiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComiteService],
    }).compile();

    service = module.get<ComiteService>(ComiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
