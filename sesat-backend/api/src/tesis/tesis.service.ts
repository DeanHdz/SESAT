import { Injectable } from "@nestjs/common";
import { CreateTesisDto } from "./dto/create-tesis.dto";
import { UpdateTesisDto } from "./dto/update-tesis.dto";
import { Tesis } from "./entities/tesis.entity";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DatosAlumno } from "src/datos-alumno/entities/datos-alumno.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Programa } from "src/programa/entities/programa.entity";
import { Comite } from "src/comite/entities/comite.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";

@Injectable()
export class TesisService {
  constructor(
    @InjectRepository(Tesis)
    private tesisRepository: Repository<Tesis>
  ) {}

  create(createTesisDto: CreateTesisDto) {
    return this.tesisRepository.save(createTesisDto);
  }

  findAll() {
    return this.tesisRepository.find();
  }

  findActive() {
    return this.tesisRepository.find({ where: { estado_activo: true } });
  }

  findInactive() {
    return this.tesisRepository.find({ where: { estado_activo: false } });
  }

  /**
   * 
   * select count(usuario.clave)  
      from usuario 
      join datos_alumno on usuario.id_datos_alumno = datos_alumno.id_datos_alumno
      join tesis on tesis.clave_alumno = usuario.clave
      where tesis.ultimo_avance = 1 and datos_alumno.grado_estudio = 'Maestria'
      and 
      datos_alumno.modalidad = 'Tiempo completo' and datos_alumno.estado_activo = true;

    .innerJoin(Usuario, 'usuario', 'tesis.clave_alumno = usuario.clave')
    .innerJoin(DatosAlumno, 'datos_alumno', 'usuario.id_datos_alumno = datos_alumno.id_datos_alumno')    
    .where('tesis.estado_activo = :estado_activo', { estado_activo: false })
    .andWhere('datos_alumno.grado_estudio = :gradoEstudio', { gradoEstudio: 'Doctorado' })    
    .select('COUNT(usuario.clave)', 'count'); 

.innerJoin('tesis.clave_alumno', 'usuario')
    .innerJoin('usuario.id_datos_alumno', 'datos_alumno')


    NOTAS:
    El avance 0 en cualquier caso es el registro de tesis
    AVANCES DE TESIS Maestría: 
      Medio tiempo: 0-3
      Tiempo Completo: 0-6
    AVANCES DE TESIS Doctorado: 0-6
    Las tesis de maestría de medio tiempo con ultimo_avance = 6 están terminadas
    Las tesis de maestría de tiempo completo con ultimo_avance = 4 están terminadas
    Las tesis de doctorado con ultimo_avance = 6 están terminadas


   */
  async findCompletedMDegreeHalfTime() {
    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecharegistro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.clave") // This includes all columns from the "usuario" table in the result.
      .addSelect("usuario.nombre")
      .addSelect("usuario.apellido_paterno")
      .addSelect("usuario.apellido_materno")
      .from(Usuario, "usuario")
      .from(DatosAlumno, "datos_alumno")
      .where("tesis.clave_alumno = usuario.clave")
      .andWhere("usuario.id_datos_alumno = datos_alumno.id_datos_alumno")
      .andWhere("tesis.estado_activo = :estado_activo", {
        estado_activo: false,
      })
      .andWhere("tesis.ultimo_avance = :ultimo_avance", { ultimo_avance: 6 })
      .andWhere("datos_alumno.grado_estudio = :gradoEstudio", {
        gradoEstudio: "Maestría",
      })
      .andWhere("datos_alumno.modalidad = :modalidad", {
        modalidad: "Medio Tiempo",
      })
      .getRawMany(); // fetch raw results, which will give us data from all the tables.
    //otherwise it won't return anything
    return resp;
  }
  async findCompletedMDegreeFullTime() {
    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecharegistro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.clave") // This includes all columns from the "usuario" table in the result.
      .addSelect("usuario.nombre")
      .addSelect("usuario.apellido_paterno")
      .addSelect("usuario.apellido_materno")
      .from(Usuario, "usuario")
      .from(DatosAlumno, "datos_alumno")
      .where("tesis.clave_alumno = usuario.clave")
      .andWhere("usuario.id_datos_alumno = datos_alumno.id_datos_alumno")
      .andWhere("tesis.estado_activo = :estado_activo", {
        estado_activo: false,
      })
      .andWhere("tesis.ultimo_avance = :ultimo_avance", { ultimo_avance: 3 })
      .andWhere("datos_alumno.grado_estudio = :gradoEstudio", {
        gradoEstudio: "Maestría",
      })
      .andWhere("datos_alumno.modalidad = :modalidad", {
        modalidad: "Tiempo Completo",
      })
      .getRawMany(); // fetch raw results, which will give us data from all the tables.
    //otherwise it won't return anything
    return resp;
  }

  /**Tesis de doctorado terminadas(se muestran e el archivo de tesis) */
  async findCompletedPhd() {
    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecharegistro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.clave") // This includes all columns from the "usuario" table in the result.
      .addSelect("usuario.nombre")
      .addSelect("usuario.apellido_paterno")
      .addSelect("usuario.apellido_materno")
      .from(Usuario, "usuario")
      .from(DatosAlumno, "datos_alumno")
      .where("tesis.clave_alumno = usuario.clave")
      .andWhere("usuario.id_datos_alumno = datos_alumno.id_datos_alumno")
      .andWhere("tesis.estado_activo = :estado_activo", {
        estado_activo: false,
      })
      .andWhere("tesis.ultimo_avance = :ultimo_avance", { ultimo_avance: 6 })
      .andWhere("datos_alumno.grado_estudio = :gradoEstudio", {
        gradoEstudio: "Doctorado",
      })
      .getRawMany(); // fetch raw results, which will give us data from all the tables.
    //otherwise it won't return anything
    return resp;
  }

  /**
   * 
   *  titulo: string,
    fecharegistro: string,
    id_tesis: number,
    clave: number,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    programa: string,
   *  
   */

  async findOneBasicInfo(id: number) {
    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecharegistro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.clave")
      .addSelect("usuario.nombre")
      .addSelect("usuario.apellido_paterno")
      .addSelect("usuario.apellido_materno")
      .addSelect("programa.nombreprograma")

      .from(Usuario, "usuario")
      .from(DatosAlumno, "datos_alumno")
      .from(Programa, "programa")

      .where("tesis.clave_alumno = usuario.clave")
      .andWhere("usuario.id_datos_alumno = datos_alumno.id_datos_alumno")
      .andWhere("datos_alumno.id_programa = programa.id_programa")

      .andWhere("tesis.id_tesis = :id_tesis", { id_tesis: id })
      .getRawOne(); // fetch raw results, which will give us one data ROW comibined from all the tables.
    //otherwise it won't return anything
    return resp;
  }

  findOne(id: number) {
    return this.tesisRepository.findOne({ where: { id_tesis: id } });
  }

  findTesisPerStudent(id_usuario: number) {
    return this.tesisRepository.findOne({ where: { id_usuario: id_usuario } });
  }

  update(updateTesisDto: UpdateTesisDto) {
    return this.tesisRepository.save(updateTesisDto);
  }

  remove(id: number) {
    return this.tesisRepository.delete(id);
  }
}
