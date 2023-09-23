import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario } from "./entities/usuario.entity";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(createUsuarioDto);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findAsesores() {
    return this.usuarioRepository.find({ where: { id_rol: 2 } });
  }

  findAlumnos() {
    return this.usuarioRepository.find({ where: { id_rol: 3 } });
  }

  async findAlumnosMaestria() {
    const alumnosMaestria: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 3 },
      relations: ["datos_alumno"],
    });

    return alumnosMaestria.filter(
      (alumno) => alumno.datos_alumno.id_grado_estudio === 1
    );
  }

  findOne(id_usuario: number) {
    return this.usuarioRepository.findOne({
      where: { id_usuario: id_usuario },
    });
  }

  identify(id_usuario: number /*Tentativo*/, password: string) {
    console.log("Entre al usuario service");
    return this.usuarioRepository.find({
      where: { id_usuario: id_usuario, password: password },
    });
  }

  update(updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.save(updateUsuarioDto);
  }

  remove(id: number) {
    return this.usuarioRepository.delete(id);
  }
}
