import { Injectable } from "@nestjs/common";
import { CreateAsignacionDto } from "./dto/create-asignacion.dto";
import { UpdateAsignacionDto } from "./dto/update-asignacion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Asignacion } from "./entities/asignacion.entity";
import { Repository } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { DatosAlumno } from "src/datos-alumno/entities/datos-alumno.entity";
import { GradoEstudio } from "src/grado-estudio/entities/grado-estudio.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import { Modalidad } from "src/modalidad/entities/modalidad.entity";
import { HttpException, HttpStatus } from '@nestjs/common';
import { Periodo } from "src/periodo/entities/periodo.entity";

@Injectable()
export class AsignacionService {
  constructor(
    @InjectRepository(Asignacion)
    private asignacionRepository: Repository<Asignacion>,

    @InjectRepository(Tesis)
    private readonly tesisRepository: Repository<Tesis>,

  ) { }

  create(createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionRepository.save(createAsignacionDto);
  }

  //Crear asignaciones pendientes para un determinado numero de avance, este debe estar en el campo
  //createAsignacionDto.num_avance
  async createGroupByNumaAvance(numAvance: number, createAsignacionDto: CreateAsignacionDto) {
    try {
      let { tipo } = createAsignacionDto
      await this.findArrayAsignacionesPendientesPhd(numAvance, tipo).then(async (idTesisArray) => {
        const promises = idTesisArray.map(async (elem) => {
          //crear una nueva instancia para cada iteracion
          const newAsignacionDto = { ...createAsignacionDto, id_tesis: elem.id_tesis };
          await this.asignacionRepository.save(newAsignacionDto);
        })

        await Promise.all(promises);

      })
      return {
        statusCode: HttpStatus.OK,
        message: 'Las asignaciones se han creado con éxito',
      };
    } catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Crear asignaciones pendientes para un determinado numero de avance, este debe estar en el campo
  //createAsignacionDto.num_avance
  async createMastersGroupByNumaAvance(numAvance: number, createAsignacionDto: CreateAsignacionDto) {
    try {
      let { id_modalidad } = createAsignacionDto
      let mod = id_modalidad === 1 ? 'Tiempo Completo' : 'Medio Tiempo'
      await this.findArrayAsignacionesPendientesMDegree(numAvance, mod).then(async (idTesisArray) => {
        const promises = idTesisArray.map(async (elem) => {
          //crear una nueva instancia para cada iteracion
          const newAsignacionDto = { ...createAsignacionDto, id_tesis: elem.id_tesis };
          await this.asignacionRepository.save(newAsignacionDto);
        })

        await Promise.all(promises);

      })
      return {
        statusCode: HttpStatus.OK,
        message: 'Las asignaciones se han creado con éxito',
      };
    } catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.asignacionRepository.find();
  }

  findOne(id: number) {
    return this.asignacionRepository.findOne({ where: { id_asignacion: id } });
  }

  //Encontrar una asignacion que pertenezca al grupo 'numAvance' y sea de tipo 'tipo'
  //Esta consulta puede regresar mas de 1 row, pero solo es necesario 1, ya que 
  //es para uso del administrador y todas las asignaciones de esta categoria son iguales
  async findOneByNumAvANDTipo(numAvance: number, tipo: number, id_periodo: number) {

    const resp = await this.asignacionRepository.createQueryBuilder('a')
      .select('a.titulo, a.descripcion')

      .innerJoin(Periodo, "p", "a.id_periodo = p.id_periodo")
      .innerJoin(Modalidad, "mod", "a.id_modalidad = mod.id_modalidad")
      .innerJoin(DatosAlumno, "da", "da.id_modalidad = mod.id_modalidad")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")


      .where("p.id_periodo = :idPeriodo", { idPeriodo: id_periodo })
      .andWhere("a.tipo = :tipoAv", { tipoAv: tipo })//tipo 1, normal, tipo 2 caso 4to av doctorado
      .andWhere("a.num_avance = :numAv", { numAv: numAvance })
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })

      .limit(1)
      .getRawOne();

    return resp;
  }

  //Encontrar el documento de la tesis terminada(ultimo_avance)
  async findDocumentByID(id: number) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("asignacion")
      .from(Tesis, 'tesis')
      .select("asignacion.documento")
      .where('tesis.id_tesis = :idtesis', { idtesis: id })
      .andWhere('asignacion.id_tesis = :id_tesis', { id_tesis: id })
      .andWhere('tesis.ultimo_avance = asignacion.num_avance')
      .getRawOne()     // fetch raw results, which will give us one data ROW comibined from all the tables.
    //otherwise it won't return anything
    return resp;
  }

  //Devuelve ARRAY {id_tesis: number, alumnos_inscritos: number}  --> Tesis de alumnos inscritos de doctorado
  async findAlumnosInscritosPHD() {
    const alumnos = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .select("t.ultimo_avance AS num_avance")
      .addSelect("COUNT(t.id_tesis) AS alumnos_inscritos")
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 8 })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Doctorado' })
      .groupBy("t.ultimo_avance")
      .getRawMany();

    return alumnos;
  }

  //Devuelve ARRAY {id_tesis: number, alumnos_inscritos: number, modalidad: string}  
  //--> Tesis de alumnos inscritos de MAESTRIA
  async findAlumnosInscritosMD() {
    const alumnos = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "mod", "mod.id_modalidad = da.id_modalidad")
      .select("t.ultimo_avance AS num_avance")
      .addSelect("COUNT(t.id_tesis) AS alumnos_inscritos")
      .addSelect("mod.nombre_modalidad AS modalidad")
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 7 })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", { estadoFinalizacion: false })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", { nombreGradoEstudio: 'Maestría' })
      .groupBy("t.ultimo_avance")
      .addGroupBy("mod.nombre_modalidad")
      .getRawMany();

    return alumnos;
  }

  /*DEVUELVE UN OBJETO PARA CADA GRUPO QUE TENGA ALUMNOS INSCRITOS
       {
          num_avance: number;
          alumnos_inscritos: number;
          num_pendientes: number;        
        }
      */
  async findStatusPHD() {
    let result;
    await this.findAlumnosInscritosPHD().then(async (alumnosArray) => {
      result = new Array(alumnosArray.length)
      const promises = alumnosArray.map(async (elem, i) => {
        let aux = await this.findNumAsignacionesPendientesPhd(elem.num_avance, 1);
        result[i] = {
          num_avance: elem.num_avance,
          alumnos_inscritos: parseInt(elem.alumnos_inscritos),
          num_pendientes: parseInt(aux),
        };

        if (elem.num_avance === 4) {
          let aux2 = await this.findNumAsignacionesPendientesPhd(elem.num_avance, 2);
          result[i] = {
            num_avance: elem.num_avance,
            alumnos_inscritos: parseInt(elem.alumnos_inscritos),
            num_pendientes: parseInt(aux) + parseInt(aux2),
          };
        }

      })

      await Promise.all(promises);

    })

    return result;
  }

  async findStatusMastersDegree() {
    let result;
    await this.findAlumnosInscritosMD().then(async (alumnosArray) => {
      result = new Array(alumnosArray.length)
      const promises = alumnosArray.map(async (elem, i) => {
        let aux = await this.findNumAsignacionesPendientesMastersDegree(elem.num_avance, elem.modalidad);
        result[i] = {
          num_avance: elem.num_avance,
          alumnos_inscritos: parseInt(elem.alumnos_inscritos),
          modalidad: elem.modalidad,
          num_pendientes: parseInt(aux),
        };

      })

      await Promise.all(promises);

    })

    return result;
  }

  /**NUMERO DE ASIGNACIONES PENDIENTES DOCTORADO*/
  async findNumAsignacionesPendientesPhd(numAvance: number, tipo: number) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("a.tipo = :tipoAv", { tipoAv: tipo });//tipo 1, normal, tipo 2 caso 4to av doctorado

    const resp = await this.tesisRepository.createQueryBuilder("t")
      .select('COUNT(t.id_tesis)', 'count')
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })
      .setParameters(subquery.getParameters())
      .getRawOne()

    return resp.count;
  }

  /**NUMERO DE ASIGNACIONES PENDIENTES MAESTRIA MEDIO TIEMPO*/
  async findNumAsignacionesPendientesMdMidTime(numAvance: number) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository.createQueryBuilder("t")
      .select('COUNT(t.id_tesis)', 'count')
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "m", "da.id_modalidad = m.id_modalidad")
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Maestría' })
      .andWhere("m.nombre_modalidad = :nombre_mod", { nombre_mod: 'Medio Tiempo' })
      .setParameters(subquery.getParameters())
      .getRawOne()

    return resp.count;
  }

  /**NUMERO DE ASIGNACIONES PENDIENTES MAESTRIA TIEMPO COMPLETO*/
  async findNumAsignacionesPendientesMdFullTime(numAvance: number) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository.createQueryBuilder("t")
      .select('COUNT(t.id_tesis)', 'count')
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "m", "da.id_modalidad = m.id_modalidad")
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Maestría' })
      .andWhere("m.nombre_modalidad = :nombre_mod", { nombre_mod: 'Tiempo Completo' })
      .setParameters(subquery.getParameters())
      .getRawOne()

    return resp.count;
  }

  /**NUMERO DE ASIGNACIONES PENDIENTES MAESTRIA POR NUM_AVANCE, MODALIDAD*/
  async findNumAsignacionesPendientesMastersDegree(numAvance: number, modalidad: string) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository.createQueryBuilder("t")
      .select('COUNT(t.id_tesis)', 'count')
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "m", "da.id_modalidad = m.id_modalidad")
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Maestría' })
      .andWhere("m.nombre_modalidad = :nombre_mod", { nombre_mod: modalidad })
      .setParameters(subquery.getParameters())
      .getRawOne()

    return resp.count;
  }

  /**TOTAL DE ASIGNACIONES ENTREGADAS DOCTORADO PARA N AVANCE */
  async findNumAsignacionesEntregadasPhd(numAvance: number, tipo: number) {

    const resp = await this.asignacionRepository.createQueryBuilder('a')
      .select('COUNT(a.id_tesis)', 'count')
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")

      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("a.tipo = :tipoAv", { tipoAv: tipo })//tipo 1, normal, tipo 2 caso 4to av doctorado  
      .andWhere("a.estado_entrega = :edoEntrega", { edoEntrega: 1 })
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })
      .getRawOne()

    return resp.count;
  }

  /**TOTAL DE ASIGNACIONES ENTREGADAS MAESTRIA PARA N AVANCE */
  async findNumAsignacionesEntregadasMD(numAvance: number, mod: number) {

    let modalidad = mod === 1 ? 'Tiempo Completo' : 'Medio Tiempo'
    const resp = await this.asignacionRepository.createQueryBuilder('a')
      .select('COUNT(a.id_tesis)', 'count')
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "m", "da.id_modalidad = m.id_modalidad")

      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("m.nombre_modalidad = :nombreMod", { nombreMod: modalidad })
      .andWhere("a.estado_entrega = :edoEntrega", { edoEntrega: 1 })
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })
      .getRawOne()

    return resp.count;
  }

  /**ARRAY DE ASIGNACIONES PENDIENTES DOCTORADO*/
  async findArrayAsignacionesPendientesPhd(numAvance: number, tipo: number) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("a.tipo = :tipoAsig", { tipoAsig: tipo })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository.createQueryBuilder("t")
      .select('t.id_tesis', 'id_tesis')
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })
      .setParameters(subquery.getParameters())
      .getRawMany()

    return resp;
  }

  /**ARRAY DE ASIGNACIONES PENDIENTES MAESTRIA*/
  async findArrayAsignacionesPendientesMDegree(numAvance: number, modalidad: string) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository.createQueryBuilder("t")
      .select('t.id_tesis AS id_tesis')
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Modalidad, "m", "da.id_modalidad = m.id_modalidad")
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Maestría' })
      .andWhere("m.nombre_modalidad = :nombre_mod", { nombre_mod: modalidad })
      .setParameters(subquery.getParameters())
      .getRawMany()
    return resp;
  }

  /**ARRAY DE ASIGNACIONES ACTIVAS DOCTORADO*/
  async findArrayAsignacionesActivasPhd(numAvance: number, tipoAssignacion: number, id_periodo: number) {

    const resp = this.asignacionRepository.createQueryBuilder('a')
      .select([
        "a.id_asignacion AS id_asignacion",
        "a.id_formato_evaluacion AS id_formato_evaluacion",
        "a.id_acta_evaluacion AS id_acta_evaluacion",
        "a.id_tesis AS id_tesis",
        "a.id_modalidad AS id_modalidad",
        "a.id_periodo AS id_periodo",
        "a.num_avance AS num_avance",
        "a.titulo AS titulo",
        "a.descripcion AS descripcion",
        "a.fecha_entrega AS fecha_entrega",
        "a.calificacion AS calificacion",
        "a.documento AS documento",
        "a.estado_entrega AS estado_entrega",
        "a.retroalimentacion AS retroalimentacion",
        "a.tipo AS tipo",
        "a.fecha_presentacion AS fecha_presentacion"

      ])
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .innerJoin(Periodo, "p", "p.id_periodo = a.id_periodo")

      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("a.tipo = :tipo", { tipo: tipoAssignacion })
      .andWhere("a.id_periodo = :periodo", { periodo: id_periodo })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("t.estado_finalizacion = false")
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })
      .getRawMany()

    return resp;
  }


  update(updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionRepository.save(updateAsignacionDto);
  }

  //actualizar asignaciones de X grupo
  async updatePhdGroup(updateAsignacionDto: UpdateAsignacionDto) {
    try {
      let { id_periodo, num_avance, tipo } = updateAsignacionDto;
      //revisar que se actualiza y que no
      await this.findArrayAsignacionesActivasPhd(num_avance, tipo, id_periodo).then(async (idTesisArray) => {
        const promises = idTesisArray.map(async (elem) => {
          //crear una nueva instancia para cada iteracion        
          const newAsignacionDto = {
            ...updateAsignacionDto,
            id_tesis: elem.id_tesis,
            id_asignacion: elem.id_asignacion,
            id_modalidad: elem.id_modalidad,
            id_periodo: elem.id_periodo,
            num_avance: elem.num_avance,
            titulo: elem.titulo,
            tipo: elem.tipo,
          };
          await this.asignacionRepository.save(newAsignacionDto);
        })

        await Promise.all(promises);

      })
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
    return this.asignacionRepository.delete(id);
  }
}
