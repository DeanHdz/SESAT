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
  async createGroupByNumaAvance(numAvance: number,createAsignacionDto: CreateAsignacionDto) {    
         
    try {            
      await this.findArrayAsignacionesPendientesPhd(numAvance).then(async (idTesisArray) => {
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

  /* async findAsignacionesPendientesPhd(numAvance: number){
     
     const subquery = this.asignacionRepository
       .createQueryBuilder('a')
       .select('1')
       .from(Tesis, 'tesis')
       .where('a.id_tesis = tesis.id_tesis')
       .andWhere('tesis.ultimo_avance = :numAvance', {numAvance: numAvance})
       .andWhere('tesis.ultimo_avance = a.num_avance');
 
     return this.asignacionRepository
       .createQueryBuilder('asignacion')
       .select('t.id_tesis')
       .from(Usuario, 'u')
       .from(DatosAlumno, 'da')
       .from(GradoEstudio, 'ge')   
       .from(Tesis, 't')   
       .where(`NOT EXISTS (${subquery.getQuery()})`)
       .andWhere('t.id_usuario = u.id_usuario')
       .andWhere('u.id_datos_alumno = da.id_datos_alumno')
       .andWhere('da.id_grado_estudio = ge.id_grado_estudio')
       .andWhere('t.estado_finalizacion = :estadoFinalizacion', { estadoFinalizacion: false })
       .andWhere('da.estado_activo = :estadoActivo', { estadoActivo: true })
       .andWhere('ge.nombre_grado_estudio = :nombreGradoEstudio', { nombreGradoEstudio: 'Doctorado' })
       .setParameters(subquery.getParameters())  // Add parameters from the subquery
       .getMany();
   }  
   */
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

  /**ARREGLO DE PENDIENTES PHD */
  /*
  async findAsignacionesPendientesPhd(numAvance: number) {

    //Error solucionado: usar CreateQueryBuilder dos veces para
    //la misma tabla no funciona como se espera
    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance");      
    
    return this.tesisRepository.createQueryBuilder("t")
      .select("t.id_tesis")
      .innerJoin(Usuario, "u", "t.id_usuario = u.id_usuario")
      .innerJoin(DatosAlumno, "da", "u.id_datos_alumno = da.id_datos_alumno")
      .innerJoin(GradoEstudio, "ge", "da.id_grado_estudio = ge.id_grado_estudio")
      .where(`NOT EXISTS (${subquery.getQuery()})`)
      .andWhere("t.estado_finalizacion = false")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("da.estado_activo = true")
      .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })
      .setParameters(subquery.getParameters())
      .getRawMany();
  }*/

  /**NUMERO DE ASIGNACIONES PENDIENTES DOCTORADO*/
  async findNumAsignacionesPendientesPhd(numAvance: number, tipo: number) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
      .andWhere("t.ultimo_avance = a.num_avance")
      .andWhere("a.tipo = :tipoAv",{ tipoAv: tipo });//tipo 1, normal, tipo 2 caso 4to av doctorado

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
        .andWhere("a.tipo = :tipoAv",{ tipoAv: tipo })//tipo 1, normal, tipo 2 caso 4to av doctorado  
        .andWhere("a.estado_entrega = :edoEntrega", { edoEntrega: 1 })
        .andWhere("t.estado_finalizacion = false")
        .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
        .andWhere("da.estado_activo = true")
        .andWhere("ge.nombre_grado_estudio = :grado", { grado: 'Doctorado' })        
        .getRawOne()
  
      return resp.count;
    }

  /**ARRAY DE ASIGNACIONES PENDIENTES DOCTORADO*/
  async findArrayAsignacionesPendientesPhd(numAvance: number) {

    const subquery = this.asignacionRepository.createQueryBuilder('a')
      .select('1')
      .where("a.id_tesis = t.id_tesis")
      .andWhere("t.ultimo_avance = :numAv", { numAv: numAvance })
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


  update(updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionRepository.save(updateAsignacionDto);
  }

  remove(id: number) {
    return this.asignacionRepository.delete(id);
  }
}
