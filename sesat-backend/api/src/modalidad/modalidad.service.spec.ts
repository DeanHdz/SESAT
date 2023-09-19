import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadService } from './modalidad.service';

describe('ModalidadService', () => {
  let service: ModalidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalidadService],
    }).compile();

    service = module.get<ModalidadService>(ModalidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
