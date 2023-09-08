import { Module } from '@nestjs/common';
import { UsuariosPruebaService } from './usuarios_prueba.service';
import { UsuariosPruebaController } from './usuarios_prueba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosPrueba } from './entities/usuarios_prueba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosPrueba])],
  controllers: [UsuariosPruebaController],
  providers: [UsuariosPruebaService],
  exports: [UsuariosPruebaService],
})
export class UsuariosPruebaModule {}
