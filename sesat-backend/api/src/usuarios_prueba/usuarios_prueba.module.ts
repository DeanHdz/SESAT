import { Module } from '@nestjs/common';
import { UsuariosPruebaService } from './usuarios_prueba.service';
import { UsuariosPruebaController } from './usuarios_prueba.controller';

@Module({
  controllers: [UsuariosPruebaController],
  providers: [UsuariosPruebaService]
})
export class UsuariosPruebaModule {}
