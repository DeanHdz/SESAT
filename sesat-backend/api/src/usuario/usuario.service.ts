import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario } from "./entities/usuario.entity";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { runInThisContext } from "vm";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}

  //AAAAAAAAAAAAA it fucking works ffs ::)
  async paginateMasterStudents(options: IPaginationOptions): Promise<Pagination<Usuario>> {

    //Just in case, Imma keep this old shit here for reference (?)
    /*async findAlumnosMaestriaPaginated(page: number, pageSize: number) {
    const skip = (page -1) * pageSize;
    const data = await this.usuarioRepository.findAndCount({
      skip,
      take: pageSize,
    });

    return data;
  }*/
    /*async findAlumnosMaestriaPaginated(paginationDto: PaginationDto): Promise<Usuario[]> {
    //const { page, pageSize } = paginationDto;
    const page = 1;
    const pageSize = 2;
    const skip = (page - 1) * pageSize;

    const alumnosMaestriaQuery = this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoinAndSelect('usuario.datos_alumno', 'datos_alumno')
      .where('usuario.id_rol = :id_rol', { id_rol: 3 })
      .andWhere('datos_alumno.id_grado_estudio = :id_grado_estudio', { id_grado_estudio: 1 })
      .skip(skip)
      .take(pageSize);

    return await alumnosMaestriaQuery.getMany();
  }*/



    const alumnosMaestriaQuery = this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoinAndSelect('usuario.datos_alumno', 'datos_alumno')
      .where('usuario.id_rol = :id_rol', { id_rol: 3 })
      .andWhere('datos_alumno.id_grado_estudio = :id_grado_estudio', { id_grado_estudio: 1 });

    return paginate<Usuario>(alumnosMaestriaQuery, options);
  }

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

  async findAlumnosMaestriaById(id_usuario: number){
    const alumnosMaestria: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 3 },
      relations: ["datos_alumno"],
    });

    return alumnosMaestria.filter(
      (alumno) => alumno.datos_alumno.id_grado_estudio === 1 && alumno.id_usuario === id_usuario
    );
  }

  async findAlumnosMaestriaByName(nombre: string){
    const alumnosMaestria: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 3 },
      relations: ["datos_alumno"],
    });

    return alumnosMaestria.filter(
      (alumno) => alumno.datos_alumno.id_grado_estudio === 1 && (
        `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`
      )
        .toLowerCase()
        .includes(nombre.toLowerCase())
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
