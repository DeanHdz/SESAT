import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { CreateFromExternalDto } from "./dto/create-usuario-external.dto";
import { Usuario } from "./entities/usuario.entity";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Comite } from "src/comite/entities/comite.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import { DatosAlumno } from "src/datos-alumno/entities/datos-alumno.entity";
import { DatosAlumnoService } from "src/datos-alumno/datos-alumno.service";
import { CreateDatosAlumnoDto } from "src/datos-alumno/dto/create-datos-alumno.dto";
import { CreateTesisDto } from "src/tesis/dto/create-tesis.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { ProgramaService } from "src/programa/programa.service";
import { CreateProgramaDto } from "src/programa/dto/create-programa.dto";
import { GradoEstudioService } from "src/grado-estudio/grado-estudio.service";
import { TesisService } from "src/tesis/tesis.service";
import { AsignacionService } from "src/asignacion/asignacion.service";
import { CreateAsignacionDto } from "src/asignacion/dto/create-asignacion.dto";
import { CreateForeignAsesorDto } from "./dto/create-foreign-asesor.dto";
import { DatosAsesorexternoService } from "src/datos-asesor-externo/datos-asesor-externo.service";
import { CreateDatosAsesorexternoDto } from "src/datos-asesor-externo/dto/create-datos-asesorexterno.dto";
import { VariablesSistemaService } from "src/variables-sistema/variables-sistema.service";
import { UpdateVariablesSistemaDto } from "src/variables-sistema/dto/update-variables-sistema.dto";
import { CreateExternalAsesorDto } from "./dto/create-external-asesor.dto";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly datosAlumnoService: DatosAlumnoService,
    private readonly programaService: ProgramaService,
    private readonly gradoEstudioService: GradoEstudioService,
    private readonly tesisService: TesisService,
    private readonly asignacionService: AsignacionService,
    private readonly datosAsesorexternoService: DatosAsesorexternoService,
    private readonly variablesSistemaService: VariablesSistemaService,
    private readonly httpService: HttpService
  ) {}

  async createExternalAsesor(createExternalAsesorDto: CreateExternalAsesorDto)
  {
    const apellidos: string[] = createExternalAsesorDto.apellidos.split(" ");

    const user = this.usuarioRepository.create({
      id_usuario: createExternalAsesorDto.id,
      id_rol: 2,
      nombre: createExternalAsesorDto.nombre,
      apellido_paterno: apellidos[0],
      apellido_materno: apellidos[1] ? apellidos[1] : "",
      correo: createExternalAsesorDto.email
    });

    await this.usuarioRepository.save(user);

    return user;
  }

  async paginateAsesores(options: IPaginationOptions): Promise<Pagination<Usuario>> {
    const asesoresQuery = this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.id_rol = :id_rol', { id_rol: 2 })

    return paginate<Usuario>(asesoresQuery, options);
  }

  async findAsesoresById(id_usuario: number){
    const asesores: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 2 },
      relations: ["datos_asesor_externo"],
    });

    return asesores.filter(
      (asesor) => asesor.id_usuario === id_usuario
    );
  }

  async findAsesoresByName(nombre: string){
    const asesores: Usuario[] = await this.usuarioRepository.find({
      where: { id_rol: 2 },
      relations: ["datos_asesor_externo"],
    });

    return asesores.filter(
      (asesor) => ( `${asesor.nombre} ${asesor.apellido_paterno} ${asesor.apellido_materno}`)
        .toLowerCase()
        .includes(nombre.toLowerCase())
    );
  }

  async createForeignAsesor(createForeignAsesorDto: CreateForeignAsesorDto)
  {
    const datosAsesorExternoData: CreateDatosAsesorexternoDto = {
      telefono: createForeignAsesorDto.telefono,
      institucion: createForeignAsesorDto.organizacion
    }

    const datosAsesorExterno = await this.datosAsesorexternoService.create(datosAsesorExternoData);

    const systemVariables = await this.variablesSistemaService.findOne(1);
    const newIndex: number = systemVariables.indice_clave_asesor_externo + 1;
    const systemVariablesData: UpdateVariablesSistemaDto = {
      id_variables_sistema: 1,
      indice_clave_asesor_externo: newIndex
    }

    await this.variablesSistemaService.update(systemVariablesData);

    const user = this.usuarioRepository.create({
      id_usuario: newIndex,
      id_rol: 2,
      id_datos_asesor_externo: datosAsesorExterno.id_datos_asesor_externo,
      password: "pass1234", //fix later
      nombre: createForeignAsesorDto.nombre,
      apellido_paterno: createForeignAsesorDto.apellido_paterno,
      apellido_materno: createForeignAsesorDto.apellido_materno,
      correo: createForeignAsesorDto.correo
    });

    await this.usuarioRepository.save(user);

    return user;
  }
  
  async getExternalAsesor(id: number){
    const url = `http://ciep.ing.uaslp.mx/sesat/asesor.php?id=${id}`;
    const data = await lastValueFrom(this.httpService.get(url))
    if(data.data.length !== 0){
      const userInSystem = await this.findOne(id);
      if(!userInSystem)
        return data.data[data.data.length-1];}
    else{
      return null;}
  }
  
  async createFromExternalStudent(createFromExternal: CreateFromExternalDto)
  {
    let modalidad = 0;
    switch(createFromExternal.dedicacion)
    {
      case "MT":
        modalidad = 2;
      break;
      case "TC":
        modalidad = 1;
      break;
    }

    let programa = await this.programaService.findOneByName(createFromExternal.programa);
    if(!programa)
    {
      const programData: CreateProgramaDto = {
        nombre_programa: createFromExternal.programa
      }
      programa = await this.programaService.create(programData);
    }

    const gradoEstudio = await this.gradoEstudioService.findOneByName(createFromExternal.grado_estudio);

    let hasAvancePrevio = false;
    let avancePrevio = 0; //theses start at 1
    if(createFromExternal.skipToAvance != null)
    {
      hasAvancePrevio = true;
      avancePrevio = createFromExternal.skipToAvance;
    }
      
      
    const datosAlumnoData: CreateDatosAlumnoDto = {
      id_modalidad: modalidad,
      id_programa: programa.id_programa,
      id_grado_estudio: gradoEstudio.id_grado_estudio,
      generacion: parseInt(createFromExternal.gen),
      estado_activo: true, //always defaults to true, admin has to turn off manually
      avance_previo: hasAvancePrevio,
    } 

    const datosAlumno = await this.datosAlumnoService.create(datosAlumnoData);
    const apellidos: string[] = createFromExternal.apellidos.split(" ");

    const user = this.usuarioRepository.create({
      id_usuario: createFromExternal.id,
      id_rol: 3,
      id_datos_alumno: datosAlumno.id_datos_alumno,
      nombre: createFromExternal.nombre,
      apellido_paterno: apellidos[0],
      apellido_materno: apellidos[1] ? apellidos[1] : "",
      correo: createFromExternal.email
    })

    await this.usuarioRepository.save(user);

    const tesisData: CreateTesisDto = {
      id_usuario: user.id_usuario,
      generacion: datosAlumno.generacion,
      estado_finalizacion: false,
      ultimo_avance: avancePrevio === 0 ? 1 : avancePrevio,
      titulo: null,
      fecha_registro: null
    }

    const tesis = await this.tesisService.create(tesisData);

    let asignacionData: CreateAsignacionDto = null;
    for(let i = 1; i <= avancePrevio; i++)
    {
      asignacionData = {
        id_formato_evaluacion: null,
        id_acta_evaluacion: null,
        id_tesis: tesis.id_tesis,
        id_modalidad: datosAlumno.id_modalidad,
        id_periodo: 1, //1 is the generic one, in the past
        num_avance: i,
        titulo: "Asignación Creada por el Sistema",
        descripcion: "Esta asignación se ha creado para acomodar al alumno en el sistema, favor de ignorar.",
        fecha_entrega: null,
        calificacion: null,
        documento: null,
        estado_entrega: 1,
        retroalimentacion: null,
        tipo: i === 5 ? 2 : 1,
        fecha_presentacion: null
      }
      await this.asignacionService.create(asignacionData);
    }
    
    return user;
  }

  async getExternalStudent(id: number){
    const url = `http://ciep.ing.uaslp.mx/sesat/student.php?id=${id}`;
    const data = await lastValueFrom(this.httpService.get(url))
    if(data.data.length !== 0){
      const userInSystem = await this.findOne(id);
      if(!userInSystem)
        return data.data[data.data.length-1];}
    else{
      return null;}
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
