import { Injectable } from '@nestjs/common';
import { CreateUsuariosPruebaDto } from './dto/create-usuarios_prueba.dto';
import { UpdateUsuariosPruebaDto } from './dto/update-usuarios_prueba.dto';
import { UsuariosPrueba } from './entities/usuarios_prueba.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosPruebaService {
  constructor(
    @InjectRepository(UsuariosPrueba)
    private usuariopruebaRepository: Repository<UsuariosPrueba>
  ) {}
  create(createUsuariosPruebaDto: CreateUsuariosPruebaDto) {
    return 'This action adds a new usuariosPrueba';
  }

  findAll() {
    return `This action returns all usuariosPrueba`;
  }

  findOne(id: number) {
    return this.usuariopruebaRepository.findOne({ where: { clave_unica: id } });
  }

  update(id: number, updateUsuariosPruebaDto: UpdateUsuariosPruebaDto) {
    return `This action updates a #${id} usuariosPrueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuariosPrueba`;
  }
}
