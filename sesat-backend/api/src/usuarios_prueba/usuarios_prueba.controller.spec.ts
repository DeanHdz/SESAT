import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosPruebaController } from './usuarios_prueba.controller';
import { UsuariosPruebaService } from './usuarios_prueba.service';

describe('UsuariosPruebaController', () => {
  let controller: UsuariosPruebaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosPruebaController],
      providers: [UsuariosPruebaService],
    }).compile();

    controller = module.get<UsuariosPruebaController>(UsuariosPruebaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
