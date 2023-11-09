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
import { HttpException, HttpStatus } from "@nestjs/common";
import { Periodo } from "src/periodo/entities/periodo.entity";
import { MailService } from "src/mail/mail.service";
import { TesisService } from "src/tesis/tesis.service";
import { Comite } from "src/comite/entities/comite.entity";
import { NotificacionService } from "src/notification/notification.service";
import { ComiteService } from "src/comite/comite.service";

@Injectable()
export class AsignacionService {
  constructor(
    @InjectRepository(Asignacion)
    private asignacionRepository: Repository<Asignacion>,

    @InjectRepository(Tesis)
    private readonly tesisRepository: Repository<Tesis>,

    private readonly mailService: MailService,

    private readonly notificacionService: NotificacionService,

    private readonly comiteService: ComiteService
  ) {}

  create(createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionRepository.save(createAsignacionDto);
  }

  /**
   * Crear asignaciones pendientes para un determinado GRUPO de alumnos de DOCTORADO
   * Ver docs del metodo: findArrayAsignacionesPendientesPhd()
   * @param numAvance equivale al semestre p. ej. 3 representa seminario de avance de tesis 3
   * @param createAsignacionDto el body del POST request, con datos como titulo y desc.
   * @returns HttpStatus ---> OK | Error
   */
  async createGroupByNumaAvance(
    numAvance: number,
    createAsignacionDto: CreateAsignacionDto
  ) {
    try {
      let { tipo, id_periodo } = createAsignacionDto;
      await this.findArrayAsignacionesPendientesPhd(
        id_periodo,
        numAvance,
        tipo
      ).then(async (idTesisArray) => {
        const promises = idTesisArray.map(async (elem: Tesis) => {
          //crear una nueva instancia para cada iteracion
          const newAsignacionDto = {
            ...createAsignacionDto,
            id_tesis: elem.id_tesis,
          };

          const newAssignment = await this.asignacionRepository.save(
            newAsignacionDto
          );

          let tesis = await this.tesisRepository.findOne({
            where: { id_tesis: elem.id_tesis },
            relations: ["alumno"],
          });

          let comite = await this.comiteService.findPerTesis(elem.id_tesis);

          comite.forEach((member) => {
            this.notificacionService.create({
              id_usuario: member.id_usuario,
              titulo: "Se ha creado una Asignacion",
              descripcion: `La asignacion ${newAssignment.titulo} ha sido creada para el alumno ${tesis.alumno.nombre} ${tesis.alumno.apellido_paterno} ${tesis.alumno.apellido_materno}`,
              fecha_expedicion: new Date(),
            });
          });
          this.notificacionService.create({
            id_usuario: tesis.alumno.id_usuario,
            titulo: "Se ha creado una Asignacion",
            descripcion: `La asignacion ${newAssignment.titulo} ha sido creada`,
            fecha_expedicion: new Date(),
          });
          this.mailService.newAssignment(newAssignment, tesis.alumno);
        });
        await Promise.all(promises);
      });
      return {
        statusCode: HttpStatus.OK,
        message: "Las asignaciones se han creado con éxito",
      };
    } catch (error) {
      throw new HttpException(
        "Ocurrió un error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Crear asignaciones pendientes para un determinado GRUPO de alumnos de DOCTORADO
   * Ver docs del metodo: findArrayAsignacionesPendientesPhd()
   * @param numAvance equivale al semestre p. ej. 3 representa seminario de tesis II (50%) (modalidad full-time)
   * @param createAsignacionDto el body del POST request, con datos como titulo, desc y modalidad
   * @returns HttpStatus ---> OK | Error
   */
  async createMastersGroupByNumaAvance(
    numAvance: number,
    createAsignacionDto: CreateAsignacionDto
  ) {
    try {
      let { id_modalidad, id_periodo } = createAsignacionDto;

      await this.findArrayAsignacionesPendientesMDegree(
        id_periodo,
        numAvance,
        id_modalidad
      ).then(async (idTesisArray) => {
        const promises = idTesisArray.map(async (elem) => {
          //crear una nueva instancia para cada iteracion
          const newAsignacionDto = {
            ...createAsignacionDto,
            id_tesis: elem.id_tesis,
          };
          
          const newAssignment = await this.asignacionRepository.save(newAsignacionDto);

          let tesis = await this.tesisRepository.findOne({
            where: { id_tesis: elem.id_tesis },
            relations: ["alumno"],
          });

          let comite = await this.comiteService.findPerTesis(elem.id_tesis);

          comite.forEach((member) => {
            this.notificacionService.create({
              id_usuario: member.id_usuario,
              titulo: "Se ha creado una Asignacion",
              descripcion: `La asignacion ${newAssignment.titulo} ha sido creada para el alumno ${tesis.alumno.nombre} ${tesis.alumno.apellido_paterno} ${tesis.alumno.apellido_materno}`,
              fecha_expedicion: new Date(),
            });
          });
          this.notificacionService.create({
            id_usuario: tesis.alumno.id_usuario,
            titulo: "Se ha creado una Asignacion",
            descripcion: `La asignacion ${newAssignment.titulo} ha sido creada`,
            fecha_expedicion: new Date(),
          });
          this.mailService.newAssignment(newAssignment, tesis.alumno);
        });

        await Promise.all(promises);
      });

      return {
        statusCode: HttpStatus.OK,
        message: "Las asignaciones se han creado con éxito",
      };
    } catch (error) {
      throw new HttpException(
        "Ocurrió un error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Tabla asignaciones
   * @returns {[Asignacion]}
   */
  findAll() {
    return this.asignacionRepository.find();
  }

  findActive() {
    return this.asignacionRepository.find({
      where: { estado_entrega: 0 },
      relations: ["periodo"],
    });
  }

  /**
   * Una asignacion que coincida con el id
   * @param id
   * @returns {Asignacion} Objeto con los datos de la asignacion
   */
  findOne(id: number) {
    return this.asignacionRepository.findOne({ where: { id_asignacion: id } });
  }

  async findOneToReview(idAsesor: number, idAsignacion: number) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
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
        "a.fecha_presentacion AS fecha_presentacion",
        "c.id_funcion as id_funcion",
      ])

      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Comite, "c", "c.id_tesis = t.id_tesis")

      .where("a.id_asignacion = :idAsign", { idAsign: idAsignacion })
      .andWhere("c.id_usuario = :idUser", { idUser: idAsesor })

      .getRawOne();

    return resp;
  }

  //Regresar asignaciones en base al periodo e ID de usuario
  async findAsignacionesByPeriodAndAlumno(idPeriodo: number, idAlumno: number) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
      .select([
        "a.id_asignacion AS id_asignacion",
        "a.num_avance AS num_avance",
        "a.titulo AS titulo",
        "a.fecha_entrega AS fecha_entrega",
      ])

      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "u.id_usuario = t.id_usuario")

      .where("a.id_periodo = :id_periodo", { id_periodo: idPeriodo })
      .andWhere("u.id_usuario = :idUser", { idUser: idAlumno })

      .getRawMany();

    return resp;
  }

  /**
   * Titulo y descripcion de un GRUPO de asignaciones de DOCTORADO
   * @param id_periodo el periodo al que pertenece el grupo, normalmente el mas reciente
   * @param numAvance equivale al semestre, 3 representaria el grupo de Seminario de Avance de Tesis 3
   * @param tipo '1'--> cualquier asignacion que cierre al fin de sem., '2' --> evaluacion inicio de sem
   * @returns {titulo: string, descripcion: string} Un objeto JSON con el titulo y descripcion de las asignaciones del grupo
   */
  async findOneInGroupPHD(id_periodo: number, numAvance: number, tipo: number) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
      .select("a.titulo, a.descripcion")

      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "u.id_usuario = t.id_usuario")
      .innerJoin(DatosAlumno, "da", "da.id_datos_alumno = u.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "ge.id_grado_estudio = da.id_grado_estudio"
      )

      .where("ge.nombre_grado_estudio = :grado", { grado: "Doctorado" })
      .andWhere("a.id_periodo = :idPeriodo", { idPeriodo: id_periodo })
      .andWhere("a.tipo = :tipoAv", { tipoAv: tipo }) //tipo 1, normal, tipo 2 caso 4to av doctorado
      .andWhere("a.num_avance = t.ultimo_avance")
      .andWhere("a.num_avance = :numAv", { numAv: numAvance })
      .getRawOne();

    return resp;
  }

  /**
   * Titulo y descripcion de un GRUPO de asignaciones de MAESTRÍA
   * @param id_periodo el periodo al que pertenece el grupo, normalmente el mas reciente
   * @param numAvance es equivalente al semestre, p. ej. 3, representa Semestre 3 --> Seminario de Tesis II
   * @param modalidad en Maestría es necesario indicar la modalidad, el num. de semestres varia segun la mod.
   * @returns {titulo: string; descripcion: string} Un objeto JSON con el titulo y descripcion de las asignaciones del grupo, NOTA: al ser del mismo grupo, estos datos son iguales, por eso no es necesario devolver un array
   */
  async findOneInGroupMD(
    id_periodo: number,
    numAvance: number,
    modalidad: number
  ) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
      .select("a.titulo, a.descripcion")

      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "u.id_usuario = t.id_usuario")
      .innerJoin(DatosAlumno, "da", "da.id_datos_alumno = u.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "ge.id_grado_estudio = da.id_grado_estudio"
      )

      .where("ge.nombre_grado_estudio = 'Maestría'")
      .andWhere("a.id_periodo = :idPeriodo", { idPeriodo: id_periodo })
      .andWhere("a.id_modalidad = :idMod", { idMod: modalidad })
      .andWhere("a.num_avance = t.ultimo_avance")
      .andWhere("a.num_avance = :numAv", { numAv: numAvance })
      .getRawOne();

    return resp;
  }

  /**
   * Encontrar el documento de la tesis terminada(ultimo_avance)
   * @param id El id de la tesis
   * @returns {documento: {type: string; data: number[]}} Un objeto con el buffer de datos del PDF(Codificados en base64)
   */
  async findDocumentByID(id: number) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("asignacion")
      .from(Tesis, "tesis")
      .select("asignacion.documento")
      .where("tesis.id_tesis = :idtesis", { idtesis: id })
      .andWhere("asignacion.id_tesis = :id_tesis", { id_tesis: id })
      .andWhere("tesis.ultimo_avance = asignacion.num_avance")
      .getRawOne();
    return resp;
  }

  /**
   * Total Alumnos inscritos de doctorado agrupados por semestre (num_avance)
   * @returns {[{num_avance: number, alumnos_inscritos: number}]}
   */
  async findAlumnosInscritosPHD() {
    const alumnos = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )
      .select("t.ultimo_avance AS num_avance")
      .addSelect("COUNT(t.id_tesis) AS alumnos_inscritos")
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 8 })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", {
        estadoFinalizacion: false,
      })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", {
        nombreGradoEstudio: "Doctorado",
      })
      .groupBy("t.ultimo_avance")
      .getRawMany();

    return alumnos;
  }

  /**
   * Total Alumnos inscritos de MAESTRIA agrupados por semestre y modalidad (num_avance, modalidad)
   * @returns {[{num_avance: number, alumnos_inscritos: number, modalidad: string}]}
   */
  async findAlumnosInscritosMD() {
    const alumnos = await this.tesisRepository
      .createQueryBuilder("t")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )
      .innerJoin(Modalidad, "mod", "mod.id_modalidad = da.id_modalidad")
      .select("t.ultimo_avance AS num_avance")
      .addSelect("COUNT(t.id_tesis) AS alumnos_inscritos")
      .addSelect("mod.nombre_modalidad AS modalidad")
      .where("t.ultimo_avance BETWEEN :min AND :max", { min: 1, max: 7 })
      .andWhere("t.estado_finalizacion = :estadoFinalizacion", {
        estadoFinalizacion: false,
      })
      .andWhere("da.estado_activo = :estadoActivo", { estadoActivo: true })
      .andWhere("ge.nombre_grado_estudio = :nombreGradoEstudio", {
        nombreGradoEstudio: "Maestría",
      })
      .groupBy("t.ultimo_avance")
      .addGroupBy("mod.nombre_modalidad")
      .getRawMany();

    return alumnos;
  }

  /**
   * Total Alumnos inscritos de doctorado agrupados por semestre AGREGA el numero de asignaciones pendientes
   * @param idPeriodo id del periodo mas reciente
   * @returns {[{num_avance: number, alumnos_inscritos: number, num_pendientes: number, }]}
   */
  async findStatusPHD(idPeriodo: number) {
    //considerar periodo
    let result;
    await this.findAlumnosInscritosPHD().then(async (alumnosArray) => {
      result = new Array(alumnosArray.length);
      const promises = alumnosArray.map(async (elem, i) => {
        let aux = await this.findNumAsignacionesPendientesPhd(
          idPeriodo,
          elem.num_avance,
          1
        );
        result[i] = {
          num_avance: elem.num_avance,
          alumnos_inscritos: parseInt(elem.alumnos_inscritos),
          num_pendientes: parseInt(aux),
        };

        if (elem.num_avance === 4) {
          let aux2 = await this.findNumAsignacionesPendientesPhd(
            idPeriodo,
            elem.num_avance,
            2
          );
          result[i] = {
            num_avance: elem.num_avance,
            alumnos_inscritos: parseInt(elem.alumnos_inscritos),
            num_pendientes: parseInt(aux) + parseInt(aux2),
          };
        }
      });

      await Promise.all(promises);
    });

    return result;
  }

  /**
   * Total Alumnos inscritos de maestría agrupados por semestre/modalidad AGREGA el numero de asignaciones pendientes
   * @param idPeriodo id del periodo mas reciente
   * @returns [{num_avance: number, alumnos_inscritos: number, num_pendientes: number, }]
   */
  async findStatusMastersDegree(idPeriodo: number) {
    let result;
    await this.findAlumnosInscritosMD().then(async (alumnosArray) => {
      result = new Array(alumnosArray.length);
      const promises = alumnosArray.map(async (elem, i) => {
        let idMod = elem.modalidad === "Tiempo Completo" ? 1 : 2;
        let aux = await this.findNumAsignacionesPendientesMastersDegree(
          idPeriodo,
          elem.num_avance,
          idMod
        );
        result[i] = {
          num_avance: elem.num_avance,
          alumnos_inscritos: parseInt(elem.alumnos_inscritos),
          modalidad: elem.modalidad,
          num_pendientes: parseInt(aux),
        };
      });

      await Promise.all(promises);
    });

    return result;
  }

  /**
   * Devuleve el total de asignaciones pendientes para determinado grupo de DOCTORADO
   * @param id_periodo el periodo al que corresponda
   * @param numAvance equivale al semestre, 3 representaria el grupo de Seminario de Avance de Tesis 3
   * @param tipo '1'--> cualquier asignacion que cierre al fin de sem., '2' --> evaluacion inicio de sem
   * @returns {number}
   */
  async findNumAsignacionesPendientesPhd(
    id_periodo: number,
    numAvance: number,
    tipo: number
  ) {
    const subquery = this.asignacionRepository
      .createQueryBuilder("a")
      .select("1")
      .where("a.id_tesis = t.id_tesis")
      .andWhere("a.id_periodo = :idperiodo", { idperiodo: id_periodo })
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("a.tipo = :tipoAv", { tipoAv: tipo });

    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .select("COUNT(t.id_tesis)", "count")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Doctorado" })
      .setParameters(subquery.getParameters())
      .getRawOne();

    return resp.count;
  }

  /**
   * TOTAL DE ASIGNACIONES PENDIENTES MAESTRIA POR NUM_AVANCE/ MODALIDAD
   * @param id_periodo ID del periodo al que corresponda
   * @param numAvance es equivalente al semestre, p. ej. 3, representa Semestre 3 --> Seminario de Tesis II asumiendo que la modalidad es de tiempo completo
   * @param idModalidad 1 -->Tiempo completo | 2 --> Medio tiempo
   * @returns {number}
   */
  async findNumAsignacionesPendientesMastersDegree(
    id_periodo: number,
    numAvance: number,
    idModalidad: number
  ) {
    const subquery = this.asignacionRepository
      .createQueryBuilder("a")
      .select("1")
      .where("a.id_tesis = t.id_tesis")
      .andWhere("a.id_periodo = :idperiodo", { idperiodo: id_periodo })
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .select("COUNT(t.id_tesis)", "count")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("da.id_modalidad = :idMod", { idMod: idModalidad })
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Maestría" })
      .setParameters(subquery.getParameters())
      .getRawOne();

    return resp.count;
  }

  /**
   * TOTAL DE ASIGNACIONES ENTREGADAS DOCTORADO PARA DETERMINADO GRUPO
   * @param idPeriodo el id del periodo actual
   * @param numAvance es equivalente al semestre o grupo, p. ej. 3, representa Semestre 3 -> Seminario de Tesis 3
   * @param tipo '1'--> cualquier asignacion que cierre al fin de sem., '2' --> evaluacion inicio de sem
   * @returns { number }
   */
  async findNumAsignacionesEntregadasPhd(
    idPeriodo: number,
    numAvance: number,
    tipo: number
  ) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
      .select("COUNT(a.id_tesis)", "count")
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )

      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("a.tipo = :tipoAv", { tipoAv: tipo }) //tipo 1, normal, tipo 2 caso 4to av doctorado
      .andWhere("a.estado_entrega = :edoEntrega", { edoEntrega: 1 })
      .andWhere("a.id_periodo = :periodo", { periodo: idPeriodo })
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Doctorado" })
      .getRawOne();

    return resp.count;
  }

  /**
   * TOTAL DE ASIGNACIONES ENTREGADAS MAESTRIA PARA N AVANCE
   * @param idPeriodo el id del periodo actual
   * @param numAvance es equivalente al semestre o grupo
   * @param idModalidad 1 -->Tiempo completo | 2 --> Medio tiempo
   * @returns {number}
   */
  async findNumAsignacionesEntregadasMD(
    idPeriodo: number,
    numAvance: number,
    idModalidad: number
  ) {
    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
      .select("COUNT(a.id_tesis)", "count")
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )

      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("da.id_modalidad = :idMod", { idMod: idModalidad })
      .andWhere("a.estado_entrega = :edoEntrega", { edoEntrega: 1 })
      .andWhere("a.id_periodo = :periodo", { periodo: idPeriodo })
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Doctorado" })
      .getRawOne();

    return resp.count;
  }

  /**
   * ARRAY DE ASIGNACIONES PENDIENTES DE CREAR PARA UN GRUPO DE DOCTORADO
   * @param idPeriodo El ID del periodo correspondiente
   * @param numAvance es equivalente al semestre o grupo de alumnos
   * @param tipo '1'--> cualquier asignacion que cierre al fin de sem., '2' --> evaluacion inicio de sem
   * @returns {[id_tesis: number]}
   */
  async findArrayAsignacionesPendientesPhd(
    idPeriodo: number,
    numAvance: number,
    tipo: number
  ) {
    const subquery = this.asignacionRepository
      .createQueryBuilder("a")
      .select("1")
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("a.tipo = :tipoAsig", { tipoAsig: tipo })
      .andWhere("a.id_periodo = :periodo", { periodo: idPeriodo })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .select("t.id_tesis", "id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Doctorado" })
      .setParameters(subquery.getParameters())
      .getRawMany();

    return resp;
  }

  /**
   * ARRAY DE ASIGNACIONES PENDIENTES DE CREAR PARA UN GRUPO DE MAESTRIA
   * @param idPeriodo El ID del periodo correspondiente
   * @param numAvance es equivalente al semestre o grupo de alumnos
   * @param idModalidad 1 -->Tiempo completo | 2 --> Medio tiempo
   * @returns {[id_tesis: number]}
   */
  async findArrayAsignacionesPendientesMDegree(
    idPeriodo: number,
    numAvance: number,
    idModalidad: number
  ) {
    const subquery = this.asignacionRepository
      .createQueryBuilder("a")
      .select("1")
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("a.id_periodo = :periodo", { periodo: idPeriodo })
      .andWhere("t.ultimo_avance = a.num_avance");

    const resp = await this.tesisRepository
      .createQueryBuilder("t")
      .select("t.id_tesis AS id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )

      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("da.id_modalidad = :id_mod", { id_mod: idModalidad })
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Maestría" })
      .setParameters(subquery.getParameters())
      .getRawMany();
    return resp;
  }

  /**
   * ARRAY DE ASIGNACIONES ACTIVAS PARA UN GRUPO DE DOCTORADO
   * @param id_periodo El ID del periodo correspondiente
   * @param numAvance es equivalente al semestre o grupo de alumnos
   * @param tipoAssignacion '1'--> cualquier asignacion que cierre al fin de sem., '2' --> evaluacion inicio de sem
   * @returns {[Asignacion]}
   */
  async findArrayAsignacionesActivasPhd(
    id_periodo: number,
    numAvance: number,
    tipoAssignacion: number
  ) {
    const resp = this.asignacionRepository
      .createQueryBuilder("a")
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
        "a.fecha_presentacion AS fecha_presentacion",
      ])
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )

      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("a.tipo = :tipo", { tipo: tipoAssignacion })
      .andWhere("a.id_periodo = :periodo", { periodo: id_periodo })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("t.estado_finalizacion = false")
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Doctorado" })
      .getRawMany();

    return resp;
  }

  /**
   * ARRAY DE ASIGNACIONES ACTIVAS PARA UN GRUPO DE MAESTRIA
   * @param id_periodo El ID del periodo correspondiente
   * @param numAvance es equivalente al semestre o grupo de alumnos
   * @param id_modalidad 1 -->Tiempo completo | 2 --> Medio tiempo
   * @returns
   */
  async findArrayAsignacionesActivasMD(
    id_periodo: number,
    numAvance: number,
    id_modalidad: number
  ) {
    const resp = this.asignacionRepository
      .createQueryBuilder("a")
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
        "a.fecha_presentacion AS fecha_presentacion",
      ])
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(
        GradoEstudio,
        "ge",
        "da.id_grado_estudio = ge.id_grado_estudio"
      )

      .where("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("a.id_modalidad  = :idMod", { idMod: id_modalidad })
      .andWhere("a.id_periodo = :periodo", { periodo: id_periodo })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("t.estado_finalizacion = false")
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: "Maestría" })
      .getRawMany();

    return resp;
  }

  /**
   * Actualizar datos de asignaciones de un grupo de doctorado (Se extraen los datos del grupo del DTO)
   * @param updateAsignacionDto El body del PUT request
   * @returns HttpStatus   OK | Error
   */
  async updatePhdGroup(updateAsignacionDto: UpdateAsignacionDto) {
    try {
      let { id_periodo, num_avance, tipo } = updateAsignacionDto;
      //revisar que se actualiza y que no
      await this.findArrayAsignacionesActivasPhd(
        id_periodo,
        num_avance,
        tipo
      ).then(async (idTesisArray) => {
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
        });

        await Promise.all(promises);
      });
      return {
        statusCode: HttpStatus.OK,
        message: "Las asignaciones se han actualizado con éxito",
      };
    } catch (error) {
      throw new HttpException(
        "Ocurrió un error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Actualizar datos de asignaciones de un grupo de Maestria (Se extraen los datos del grupo del DTO)
   * @param updateAsignacionDto El body del PUT request
   * @returns HttpStatus   OK | Error
   */
  async updateMDGroup(updateAsignacionDto: UpdateAsignacionDto) {
    try {
      let { id_periodo, num_avance, id_modalidad } = updateAsignacionDto;
      //revisar que se actualiza y que no
      await this.findArrayAsignacionesActivasMD(
        id_periodo,
        num_avance,
        id_modalidad
      ).then(async (idTesisArray) => {
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
        });

        await Promise.all(promises);
      });
      return {
        statusCode: HttpStatus.OK,
        message: "Las asignaciones se han actualizado con éxito",
      };
    } catch (error) {
      throw new HttpException(
        "Ocurrió un error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  update(updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionRepository.save(updateAsignacionDto);
  }

  //Actualiza el documento de avance entregado por el alumno, realiza la validacion de fecha
  turnInThesisAdvance(updateAsignacionDto: UpdateAsignacionDto) {
    
    return this.asignacionRepository.save(updateAsignacionDto);
  }

  remove(id: number) {
    return this.asignacionRepository.delete(id);
  }
}
