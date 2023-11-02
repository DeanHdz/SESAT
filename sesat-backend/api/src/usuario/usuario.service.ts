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
import { Comite } from "src/comite/entities/comite.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import { DatosAlumno } from "src/datos-alumno/entities/datos-alumno.entity";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly httpService: HttpService
  ) {}

  async getExternalStudent(id: number){
    const url = `http://ciep.ing.uaslp.mx/sesat/student.php?id=${id}`;
    const data = await lastValueFrom(this.httpService.get(url))
    return data.data[data.data.length-1];
  }

  async paginateMasterStudents(options: IPaginationOptions): Promise<Pagination<Usuario>> {
    const alumnosMaestriaQuery = this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoinAndSelect('usuario.datos_alumno', 'datos_alumno')
      .where('usuario.id_rol = :id_rol', { id_rol: 3 })
      .andWhere('datos_alumno.id_grado_estudio = :id_grado_estudio', { id_grado_estudio: 1 });

    return paginate<Usuario>(alumnosMaestriaQuery, options);
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

  async paginatePhdStudents(options: IPaginationOptions): Promise<Pagination<Usuario>> {
    const alumnosPhdQuery = this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoinAndSelect('usuario.datos_alumno', 'datos_alumno')
      .where('usuario.id_rol = :id_rol', { id_rol: 3 })
      .andWhere('datos_alumno.id_grado_estudio = :id_grado_estudio', { id_grado_estudio: 2 });

    return paginate<Usuario>(alumnosPhdQuery, options);
  }

  async findAlumnosPhd() {
    const alumnosPhd: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 3 },
      relations: ["datos_alumno"],
    });

    return alumnosPhd.filter(
      (alumno) => alumno.datos_alumno.id_grado_estudio === 2
    );
  }

  async findAlumnosPhdById(id_usuario: number){
    const alumnosPhd: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 3 },
      relations: ["datos_alumno"],
    });

    return alumnosPhd.filter(
      (alumno) => alumno.datos_alumno.id_grado_estudio === 2 && alumno.id_usuario === id_usuario
    );
  }

  async findAlumnosPhdByName(nombre: string){
    const alumnosPhd: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 3 },
      relations: ["datos_alumno"],
    });

    return alumnosPhd.filter(
      (alumno) => alumno.datos_alumno.id_grado_estudio === 2 && (
        `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`
      )
        .toLowerCase()
        .includes(nombre.toLowerCase())
    );
  }

  /**
   * Obtener el grupo de alumnos asesorados por determinado asesor
   * @param idAsesor clave unica del asesor al que le corresponden los asesorados
   * @param idGrado 1 --> Maestria 2 --> Doctorado
   * @returns {[id_usuario: number; nombre: string; apellido_paterno: string; apellido_materno: string; correo: string]}
   */
  async findAlumnosAsesorados(idAsesor: number, idGrado: number) {
    const resp = await this.usuarioRepository
      .createQueryBuilder('u')
      .innerJoin(Tesis, "t", "t.id_usuario = u.id_usuario")
      .innerJoin(Comite, "c", "c.id_tesis = t.id_tesis")      
      .innerJoin(DatosAlumno, "da", "da.id_datos_alumno = u.id_datos_alumno")   
      
      .select([
        "u.id_usuario AS id_usuario",
        "u.nombre AS nombre",
        "u.apellido_paterno AS apellido_paterno",
        "u.apellido_materno AS apellido_materno",
        "u.correo AS correo"
      ])      
      .where("c.id_usuario = :id_user", { id_user: idAsesor })
      .andWhere("t.estado_finalizacion = :edo_finalizacion", { edo_finalizacion: false })
      .andWhere("da.id_grado_estudio = :grado_estudio", { grado_estudio: idGrado })
      .getRawMany()

    return resp;
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
