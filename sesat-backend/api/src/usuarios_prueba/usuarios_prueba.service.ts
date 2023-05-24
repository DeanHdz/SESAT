import { Injectable } from '@nestjs/common';
import { CreateUsuariosPruebaDto } from './dto/create-usuarios_prueba.dto';
import { UpdateUsuariosPruebaDto } from './dto/update-usuarios_prueba.dto';

@Injectable()
export class UsuariosPruebaService {
  create(createUsuariosPruebaDto: CreateUsuariosPruebaDto) {
    return 'This action adds a new usuariosPrueba';
  }

  findAll() {
    return `This action returns all usuariosPrueba`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuariosPrueba`;
  }

  update(id: number, updateUsuariosPruebaDto: UpdateUsuariosPruebaDto) {
    return `This action updates a #${id} usuariosPrueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuariosPrueba`;
  }
}
