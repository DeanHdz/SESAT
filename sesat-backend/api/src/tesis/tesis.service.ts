import { Injectable } from '@nestjs/common';
import { CreateTesisDto } from './dto/create-tesis.dto';
import { UpdateTesisDto } from './dto/update-tesis.dto';
import { Tesis } from './entities/tesis.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosAlumno } from 'src/datos-alumno/entities/datos-alumno.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Comite } from 'src/comite/entities/comite.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { GradoEstudio } from 'src/grado-estudio/entities/grado-estudio.entity';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';


@Injectable()
export class TesisService {
  constructor(
    @InjectRepository(Tesis)
    private tesisRepository: Repository<Tesis>,

    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,

  ) { }


  create(createTesisDto: CreateTesisDto) {
    return this.tesisRepository.save(createTesisDto);
  }

  findAll() {
    return this.tesisRepository.find();
  }

  findActive() {
    return this.tesisRepository.find({ where: { estado_activo: true } })
  }

  findInactive() {
    return this.tesisRepository.find({ where: { estado_activo: false } })
  }

  /**
   * 

    NOTAS:
    El registro de tesis no se considera una asignacion
    AVANCES DE TESIS Maestría: 
      Medio tiempo: 1-3
      Tiempo Completo: 1-6
    AVANCES DE TESIS Doctorado: 1-6
    Las tesis de maestría de medio tiempo con ultimo_avance = 6 están terminadas
    Las tesis de maestría de tiempo completo con ultimo_avance = 4 están terminadas
    Las tesis de doctorado con ultimo_avance = 6 están terminadas


   */
  /**Tesis de maestria medio tiempo terminadas(se muestran en el archivo de tesis) */
  async findCompletedMDegreeHalfTime() {

    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecha_registro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.id_usuario")  // This includes all columns from the "usuario" table in the result.      
      .addSelect("usuario.nombre")
      .addSelect("usuario.apellido_paterno")
      .addSelect("usuario.apellido_materno")

      .from(Usuario, 'usuario')
      .from(DatosAlumno, 'datos_alumno')
      .from(Modalidad, 'modalidad')
      .from(GradoEstudio, 'ge')

      .where('tesis.id_usuario = usuario.id_usuario')
      .andWhere('usuario.id_datos_alumno = datos_alumno.id_datos_alumno')
      .andWhere('datos_alumno.id_modalidad = modalidad.id_modalidad')
      .andWhere('datos_alumno.id_grado_estudio = ge.id_grado_estudio')

      .andWhere('tesis.estado_finalizacion = :estado_finalizacion', { estado_finalizacion: true })
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 6 })//revisar
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Maestría' })
      .andWhere('modalidad.nombre_modalidad = :nombre_modalidad', { nombre_modalidad: 'Medio Tiempo' })
      .getRawMany()     // fetch raw results, which will give us data from all the tables.
    //otherwise it won't return anything
    return resp;
  }

/**Tesis de maestria tiempo completo terminadas(se muestran en el archivo de tesis) */
  async findCompletedMDegreeFullTime() {

    const resp = await this.tesisRepository
    .createQueryBuilder("tesis")
    .select("tesis.titulo")
    .addSelect("tesis.fecha_registro")
    .addSelect("tesis.id_tesis")
    .addSelect("usuario.id_usuario")  // This includes all columns from the "usuario" table in the result.      
    .addSelect("usuario.nombre")
    .addSelect("usuario.apellido_paterno")
    .addSelect("usuario.apellido_materno")

    .from(Usuario, 'usuario')
    .from(DatosAlumno, 'datos_alumno')
    .from(Modalidad, 'modalidad')
    .from(GradoEstudio, 'ge')

    .where('tesis.id_usuario = usuario.id_usuario')
    .andWhere('usuario.id_datos_alumno = datos_alumno.id_datos_alumno')
    .andWhere('datos_alumno.id_modalidad = modalidad.id_modalidad')
    .andWhere('datos_alumno.id_grado_estudio = ge.id_grado_estudio')

    .andWhere('tesis.estado_finalizacion = :estado_finalizacion', { estado_finalizacion: true })
    .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 3 })//revisar
    .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Maestría' })
    .andWhere('modalidad.nombre_modalidad = :nombre_modalidad', { nombre_modalidad: 'Tiempo Completo' })
    .getRawMany()     // fetch raw results, which will give us data from all the tables.
  //otherwise it won't return anything
    return resp;
  }


  /**Tesis de doctorado terminadas(se muestran en el archivo de tesis) */
  async findCompletedPhd() {

    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecha_registro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.id_usuario")  // This includes all columns from the "usuario" table in the result.
      .addSelect("usuario.nombre")
      .addSelect("usuario.apellido_paterno")
      .addSelect("usuario.apellido_materno")

      .from(Usuario, 'usuario')
      .from(DatosAlumno, 'datos_alumno')
      .from(GradoEstudio, 'ge')

      .where('tesis.id_usuario = usuario.id_usuario')
      .andWhere('usuario.id_datos_alumno = datos_alumno.id_datos_alumno')
      .andWhere('datos_alumno.id_grado_estudio = ge.id_grado_estudio')

      .andWhere('tesis.estado_finalizacion = :estado_finalizacion', { estado_finalizacion: true })
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 6 })
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Doctorado' })
      .getRawMany()     // fetch raw results, which will give us data from all the tables.
    //otherwise it won't return anything
    return resp;
  }


  /**Encabezados para la lista de tesis del archivo de tesis*/
  async findOneBasicInfo(id: number) {
    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecha_registro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.id_usuario")
      .addSelect("usuario.nombre")
      .addSelect("usuario.apellido_paterno")
      .addSelect("usuario.apellido_materno")
      .addSelect("programa.nombre_programa")

      .from(Usuario, 'usuario')
      .from(DatosAlumno, 'datos_alumno')
      .from(Programa, 'programa')

      .where('tesis.id_usuario = usuario.id_usuario')
      .andWhere('usuario.id_datos_alumno = datos_alumno.id_datos_alumno')
      .andWhere('datos_alumno.id_programa = programa.id_programa')

      .andWhere('tesis.id_tesis = :id_tesis', { id_tesis: id })
      .getRawOne()     // fetch raw results, which will give us one data ROW comibined from all the tables.
    //otherwise it won't return anything
    return resp;
  }
  /** 
   * Nota: No se implementó en Asignacion porque no se usa esa tabla para la consulta
   * Esta consulta regresa todos los alumnos de doctorado activos y con numero de avance N
   * ----> Este numero incluye a los que tienen asignacion creada
  */
 /**Encuentra si hay alumnos de doctorado activos con ultimo_avance = N */
 //no se usa
 /*
  async findAssignmentStatusPhd() {
    const resp = await this.tesisRepository
      .createQueryBuilder('t')
      .select('COUNT(t.id_tesis)', 'count')
      .from(Usuario, 'u')
      .from(DatosAlumno, 'da')
      .from(GradoEstudio, 'ge')
      .where('t.id_usuario = u.id_usuario')
      .andWhere('u.id_datos_alumno = da.id_datos_alumno')
      .andWhere('da.id_grado_estudio = ge.id_grado_estudio')
      .andWhere('t.ultimo_avance = :ultimoAvance', { ultimoAvance: numAvance })
      .andWhere('t.estado_finalizacion = :estadoFinalizacion', { estadoFinalizacion: false })
      .andWhere('da.estado_activo = :estadoActivo', { estadoActivo: true })
      .andWhere('ge.nombre_grado_estudio = :nombreGradoEstudio', { nombreGradoEstudio: 'Doctorado' })
      .getRawOne()
    return resp.count;
  }*/


  /**Devuelve el numero de alumnos de doctorado activos para cada numero de avance
   * El formato es una tabla de dos columnas, una con el numero de avance y la otra la cantidad de alumnos
   * Si no hay alumnos NO agrega el renglon
   */
  async findTesisStatusPhd() {
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .select("t.ultimo_avance")
      .addSelect("COUNT(t.id_tesis)", "count")
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 6 })
      .where("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Doctorado' })
      .groupBy("t.ultimo_avance")
      .getRawMany()

    return resp;
  }

  async findTesisStatusMastersFullTime() {
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "mod", "da.id_modalidad = mod.id_modalidad")
      .select("t.ultimo_avance")
      .addSelect("COUNT(t.id_tesis)", "count")
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 6 })
      .where("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Maestría' })
      .andWhere("mod.nombre_modalidad = :nombreMod", { nombreMod: 'Tiempo Completo' })
      .groupBy("t.ultimo_avance")
      .getRawMany()

    return resp;
  }

  async findTesisStatusMastersMidTime() {
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "mod", "da.id_modalidad = mod.id_modalidad")
      .select("t.ultimo_avance")
      .addSelect("COUNT(t.id_tesis)", "count")
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 6 })
      .where("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Maestría' })
      .andWhere("mod.nombre_modalidad = :nombreMod", { nombreMod: 'Medio Tiempo' })
      .groupBy("t.ultimo_avance")
      .getRawMany()

    return resp;
  }



  //https://typeorm.io/select-query-builder#using-subqueries

  findOne(id: number) {
    return this.tesisRepository.findOne({ where: { id_tesis: id } });
  }

  findTesisPerStudent(id: number) {
    return this.tesisRepository.findOne({ where: { id_usuario: id } });
  }

  update(updateTesisDto: UpdateTesisDto) {
    return this.tesisRepository.save(updateTesisDto);
  }

  remove(id: number) {
    return this.tesisRepository.delete(id);
  }
}
