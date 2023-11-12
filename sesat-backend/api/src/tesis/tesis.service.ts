import { Injectable } from '@nestjs/common';
import { CreateTesisDto } from './dto/create-tesis.dto';
import { UpdateTesisDto } from './dto/update-tesis.dto';
import { Tesis } from './entities/tesis.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosAlumno } from 'src/datos-alumno/entities/datos-alumno.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { GradoEstudio } from 'src/grado-estudio/entities/grado-estudio.entity';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { Periodo } from 'src/periodo/entities/periodo.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Comite } from 'src/comite/entities/comite.entity';


@Injectable()
export class TesisService {
  constructor(
    @InjectRepository(Tesis)
    private tesisRepository: Repository<Tesis>,

    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,

  ) { }

  async paginatedCompletedPhd(page: number, limit: number) {
    const resp = await this.tesisRepository
      .createQueryBuilder("tesis")
      .select("tesis.titulo")
      .addSelect("tesis.fecha_registro")
      .addSelect("tesis.id_tesis")
      .addSelect("usuario.id_usuario")
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
      .andWhere('tesis.ultimo_avance BETWEEN :min AND :max', { min: 6, max: 8 })
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Doctorado' })
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany();
  
    return resp;
  }

  async findCompletedPhdByName(name: string){
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
      .andWhere('tesis.ultimo_avance BETWEEN :min AND :max', { min: 6, max: 8 })
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Doctorado' })
      .getRawMany()

    return resp.filter(
      (tesis) => (
        `${tesis.titulo}`
      )
        .toLowerCase()
        .includes(name.toLowerCase())
    );
  }

  async paginatedCompletedMdHalfTime(page: number, limit: number)
  {
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
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 7 })
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Maestría' })
      .andWhere('modalidad.nombre_modalidad = :nombre_modalidad', { nombre_modalidad: 'Medio Tiempo' })
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany()

      return resp;
  }

  async findCompletedMdHalfTimeByName(name: string){
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
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 7 })
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Maestría' })
      .andWhere('modalidad.nombre_modalidad = :nombre_modalidad', { nombre_modalidad: 'Medio Tiempo' })
      .getRawMany()

      return resp.filter(
        (tesis) => (
          `${tesis.titulo}`
        )
          .toLowerCase()
          .includes(name.toLowerCase())
      );
  }

  async paginatedCompletedMdFullTime(page: number, limit: number){
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
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 4 })//revisar
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Maestría' })
      .andWhere('modalidad.nombre_modalidad = :nombre_modalidad', { nombre_modalidad: 'Tiempo Completo' })
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany()

      return resp;
  }

  async findCompletedMdFullTimeByName(name: string){
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
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 4 })//revisar
      .andWhere('ge.nombre_grado_estudio = :gradoEstudio', { gradoEstudio: 'Maestría' })
      .andWhere('modalidad.nombre_modalidad = :nombre_modalidad', { nombre_modalidad: 'Tiempo Completo' })
      .getRawMany()

      return resp.filter(
        (tesis) => (
          `${tesis.titulo}`
        )
          .toLowerCase()
          .includes(name.toLowerCase())
      );
  }

  create(createTesisDto: CreateTesisDto) {
    return this.tesisRepository.save(createTesisDto);
  }

  findAll() {
    return this.tesisRepository.find();
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
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 7 })
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
      .andWhere('tesis.ultimo_avance = :ultimo_avance', { ultimo_avance: 4 })//revisar
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
      .andWhere('tesis.ultimo_avance BETWEEN :min AND :max', { min: 6, max: 8 })
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
      .addSelect("datos_alumno.id_grado_estudio")

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
  //Devuelve cuantos alumnos de doctorado hay para x numAvance(X seminario)
  async findStudentsCountByNumAv(numAvance: number) {
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")

      .select("COUNT(t.id_tesis)", "count")
      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Doctorado' })

      .getRawOne()

    return resp;
  }


  //Devuelve cuantos alumnos de doctorado hay para x numAvance(X seminario)
  async findMDStudentsCountByNumAv(numAvance: number, modalidad: number) {
    let modName = modalidad === 1 ? 'Tiempo Completo' : 'Medio Tiempo';
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "mod", "da.id_modalidad = mod.id_modalidad")
      .select("COUNT(t.id_tesis)", "count")
      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Maestría' })
      .andWhere("mod.nombre_modalidad = :nombreMod", { nombreMod: modName })
      .getRawOne()

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
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 3 })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Maestría' })
      .andWhere("mod.nombre_modalidad = :nombreMod", { nombreMod: 'Tiempo Completo' })
      .groupBy("t.ultimo_avance")
      .getRawMany()

    return resp;
  }

  async findTesisHistory(idTesis: number) {
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Asignacion, "a", "a.id_tesis = t.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "mod", "da.id_modalidad = mod.id_modalidad")
      .select([
        "a.id_asignacion AS id_asignacion",
        "a.num_avance AS num_avance",
        "ge.nombre_grado_estudio AS grado_estudio",
        "mod.nombre_modalidad AS modalidad"      
      ])      
      .where("t.id_tesis = :id", { id: idTesis })  
      .andWhere("a.id_acta_evaluacion IS NOT NULL")          
      .andWhere("a.id_formato_evaluacion IS NOT NULL")   
      .getRawMany()

    return resp;
  }

  async findFullHistory(idAlumno: number) {
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      
      
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")      
      .innerJoin(Programa, "p", "p.id_programa = da.id_programa")      
      .select([
        "t.id_tesis AS id_tesis",
        "t.titulo AS titulo",
        "t.estado_finalizacion AS estado_finalizacion",
        "t.fecha_registro AS fecha_registro",
        "da.id_grado_estudio AS grado",
        "u.nombre AS nombre",
        "u.apellido_paterno AS apellido_paterno",
        "u.apellido_materno AS apellido_materno",
        "u.correo AS correo",
        "p.nombre_programa AS nombre_programa",
        "da.estado_activo AS estado_activo"

      ])      
      .where("t.id_usuario = :id", { id: idAlumno })  
      
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
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Maestría' })
      .andWhere("mod.nombre_modalidad = :nombreMod", { nombreMod: 'Medio Tiempo' })
      .groupBy("t.ultimo_avance")
      .getRawMany()

    return resp;
  }



  //https://typeorm.io/select-query-builder#using-subqueries

  findOne(id: number) {
    return this.tesisRepository.findOne({ where: { id_tesis: id }, relations: ['alumno'] });
  }

  async findTesisPerStudent(id_usuario: number) {
    const tesisList: Tesis[] = await this.tesisRepository.find({ where: { id_usuario: id_usuario }, relations: ["alumno"] });

    const filteredTesisList: Tesis[] = tesisList.filter(
      (tesis) => ( tesis.estado_finalizacion === false)
    );

    if(filteredTesisList.length > 0)
      return filteredTesisList[0];
    else
      return null;
  }

  update(updateTesisDto: UpdateTesisDto) {
    return this.tesisRepository.save(updateTesisDto);
  }
  /**Todos los alumnos que cuya asignacion cumpla con:
   * estado_entrega === 1
   * num_avance === ultimo_avance
   * estado_finalizacion === false
   * calificacion !== null
   * NOTA: Los alumnos de 4to sem phd no deben poder entregar la asignacion final
   * si no estan evaluados en la primera
   * En maestria todas las asignaciones son tipo 1
   */
  async getEvaluatedStudents(id_periodo: number) {
    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Asignacion, "a", "a.id_tesis = t.id_tesis")
      .innerJoin(Usuario, "u", "u.id_usuario = t.id_usuario")
      .innerJoin(DatosAlumno, "da", "da.id_datos_alumno = u.id_datos_alumno")
      .innerJoin(Periodo, "p", "p.id_periodo = a.id_periodo")
      .select("t.id_tesis AS id_tesis")
      .where("t.ultimo_avance = a.num_avance")
      .andWhere("a.estado_entrega = :edoEntrega", { edoEntrega: 1 })
      .andWhere("a.calificacion IS NOT NULL")
      .andWhere("a.tipo = :tipoAsig", { tipoAsig: 1 })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("p.id_periodo = :idPeriodo", { idPeriodo: id_periodo })
      .groupBy("t.id_tesis")
      .getRawMany()

    return resp;
  }

  //actualiza 'semestre' para todos los alumnos que fueron evaluados en el periodo anterior
  async updateNumAvanceForEvaluatedStudents(id_periodo: number) {
    try {
      let idTesisArray = await this.getEvaluatedStudents(id_periodo)

      const promises = idTesisArray.map(async (elem) => {
        //obtener la tesis
        const tesis = await this.findOne(elem.id_tesis);

        let updated_avance = tesis.ultimo_avance + 1;
        //Crear copia del DTO, asignar ultimo_avance
        const updatedTesis = {
          ...tesis,
          ultimo_avance: updated_avance,
        };
        //Guardar copia actualizada
        await this.update(updatedTesis)

      })

      await Promise.all(promises);

      return {
        statusCode: HttpStatus.OK,
        message: 'Las asignaciones se han actualizado con éxito',
      };
    }
    catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  remove(id: number) {
    return this.tesisRepository.delete(id);
  }
}
