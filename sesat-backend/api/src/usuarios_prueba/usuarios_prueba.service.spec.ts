import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosPruebaService } from './usuarios_prueba.service';

describe('UsuariosPruebaService', () => {
  let service: UsuariosPruebaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosPruebaService],
    }).compile();

    service = module.get<UsuariosPruebaService>(UsuariosPruebaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
