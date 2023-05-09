import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaService } from './respuesta.service';

describe('RespuestaService', () => {
  let service: RespuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespuestaService],
    }).compile();

    service = module.get<RespuestaService>(RespuestaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
