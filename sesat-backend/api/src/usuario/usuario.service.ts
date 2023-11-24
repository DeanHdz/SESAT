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
import { EventoService } from "src/evento/evento.service";
import { Evento } from "src/evento/entities/evento.entity";
import { UpdateDatosAlumnoDto } from "src/datos-alumno/dto/update-datos-alumno.dto";
import { UpdateTesisDto } from "src/tesis/dto/update-tesis.dto";
import { UpdateAsignacionDto } from "src/asignacion/dto/update-asignacion.dto";
import { ComiteService } from "src/comite/comite.service";
import { RetrievedCommitteeDTO } from "src/comite/dto/retrieved-committee.dto";
import { CreateComiteDto } from "src/comite/dto/create-comite.dto";
import { PasswordChangeDTO } from "./dto/password-change.dto";

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
    private readonly httpService: HttpService,
    private readonly comiteService: ComiteService
  ) {}

  async changePassword(passwordChangeDTO: PasswordChangeDTO){
    const usuario: Usuario = await this.findOne(passwordChangeDTO.id_usuario);
    const updateUsuarioDTO: UpdateUsuarioDto = {
      id_usuario: passwordChangeDTO.id_usuario,
      id_rol: usuario.id_rol,
      id_datos_alumno: usuario.id_datos_alumno,
      id_datos_asesor_externo: usuario.id_datos_asesor_externo,
      nombre: usuario.nombre,
      apellido_paterno: usuario.apellido_paterno,
      apellido_materno: usuario.apellido_materno,
      password: passwordChangeDTO.password,
      correo: usuario.correo
    }
    const updatedUsuario = await this.update(updateUsuarioDTO);
    return updatedUsuario;
  }

  async findStudentByTesisId(id: number)
  {
    const tesis = await this.tesisService.findOne(id);
    return await tesis.alumno;
  }

  async changeDedication(id_usuario: number, skipToAvance: number)
  {
    const user: Usuario = await this.usuarioRepository.findOne({where: {id_usuario: id_usuario}});
    let newModalidad = 0;
     // update datos alumno
    // 1: tiempo completo, 2: medio tiempo
    switch(user.datos_alumno.id_modalidad)
    {
      case 1:
        const datosAlumnoDataTC: UpdateDatosAlumnoDto = {
          id_datos_alumno: user.datos_alumno.id_datos_alumno,
          id_modalidad: 2,
          id_programa: user.datos_alumno.id_programa,
          id_grado_estudio: user.datos_alumno.id_grado_estudio,
          generacion: user.datos_alumno.generacion,
          estado_activo: true, //always defaults to true, admin has to turn off manually
          avance_previo: false, //can leave as false, skips theses registry
        }
        newModalidad = 2;
        await this.datosAlumnoService.update(datosAlumnoDataTC);
        break;
      case 2:
        const datosAlumnoDataMT: UpdateDatosAlumnoDto = {
          id_datos_alumno: user.datos_alumno.id_datos_alumno,
          id_modalidad: 1,
          id_programa: user.datos_alumno.id_programa,
          id_grado_estudio: user.datos_alumno.id_grado_estudio,
          generacion: user.datos_alumno.generacion,
          estado_activo: true, //always defaults to true, admin has to turn off manually
          avance_previo: false, //can leave as false, skips theses registry
        }
        newModalidad = 1;
        await this.datosAlumnoService.update(datosAlumnoDataMT);
        break;
    }

    //finalize theses
    const oldTesis: Tesis = await this.tesisService.findTesisPerStudent(user.id_usuario);
    const oldTesisUpdateDTO: UpdateTesisDto = {
      id_tesis: oldTesis.id_tesis,
      id_usuario: oldTesis.id_usuario,
      titulo: "[Deprecated] " + oldTesis.titulo,
      fecha_registro: oldTesis.fecha_registro,
      generacion: oldTesis.generacion,
      ultimo_avance: oldTesis.ultimo_avance,
      estado_finalizacion: true
    }
    await this.tesisService.update(oldTesisUpdateDTO);

    //create new theses
    const newTesisData: CreateTesisDto = {
      id_usuario: user.id_usuario,
      titulo: oldTesis.titulo,
      generacion: user.datos_alumno.generacion,
      estado_finalizacion: false,
      ultimo_avance: skipToAvance, // -> will be changed later after assignment creation ???
      fecha_registro: oldTesis.fecha_registro,
    }
    const newTesis = await this.tesisService.create(newTesisData);
    // close previous open assignments
    const assignmentList = await this.asignacionService.findActiveByTesis(oldTesis.id_tesis)
    for(let i = 0; i <= assignmentList.length-1; i++)
    {
      let today = new Date();
      let asignacionUpdateDto: UpdateAsignacionDto = {
        id_asignacion: assignmentList[i].id_asignacion,
        id_formato_evaluacion: assignmentList[i].id_formato_evaluacion,
        id_acta_evaluacion: assignmentList[i].id_acta_evaluacion,
        id_tesis: oldTesis.id_tesis,
        id_modalidad: user.datos_alumno.id_modalidad,
        id_periodo: assignmentList[i].id_periodo,
        num_avance: assignmentList[i].num_avance,
        titulo: "[Closed] " + assignmentList[i].titulo,
        descripcion: assignmentList[i].descripcion,
        fecha_entrega: today.toISOString(),
        estado_entrega: 1,
        calificacion: assignmentList[i].calificacion,
        documento: assignmentList[i].documento,
        retroalimentacion: assignmentList[i].retroalimentacion,
        tipo: assignmentList[i].tipo,
        fecha_presentacion: assignmentList[i].fecha_presentacion
      }
      await this.asignacionService.update(asignacionUpdateDto);
    }

    // Deletable
    //make placeholder assignments (?remove)
    //es para cambio de modalidad?
    for(let i = 0; i < skipToAvance-1 ; i++)
    {
      let today = new Date();
      let asignacionCreateDto: CreateAsignacionDto = {
        id_formato_evaluacion: null,
        id_acta_evaluacion: null,
        id_tesis: newTesis.id_tesis,
        id_modalidad: newModalidad,
        id_periodo: 1,
        num_avance: i+1,
        titulo: "Asignación Creada por el Sistema",
        descripcion: "Esta asignación se ha creado para acomodar al alumno en el sistema, favor de ignorar.",
        fecha_entrega: today.toISOString(),
        estado_entrega: 1,
        calificacion: null,
        documento: null,
        retroalimentacion: null,
        tipo: 1,
        fecha_presentacion: null
      }
      await this.asignacionService.create(asignacionCreateDto);
    }
    // Deletable

    //CreateNewComite
    const members: RetrievedCommitteeDTO = await this.comiteService.retrieveCommittee(oldTesis.id_tesis);
    if(members.asesor)
    {
      const asesor : CreateComiteDto = {
        id_usuario: members.asesor.id_usuario,
        id_tesis: newTesis.id_tesis,
        id_funcion: 1,
      }
      await this.comiteService.create(asesor);
    }
    if(members.coasesor)
    {
      const coasesor : CreateComiteDto = {
        id_usuario: members.coasesor.id_usuario,
        id_tesis: newTesis.id_tesis,
        id_funcion: 2,
      }
      await this.comiteService.create(coasesor);
    }
    if(members.sinodal1)
    {
      const sinodal1 : CreateComiteDto = {
        id_usuario: members.sinodal1.id_usuario,
        id_tesis: newTesis.id_tesis,
        id_funcion: 3,
      }
      await this.comiteService.create(sinodal1);
    }
    if(members.sinodal2)
    {
      const sinodal2 : CreateComiteDto = {
        id_usuario: members.sinodal2.id_usuario,
        id_tesis: newTesis.id_tesis,
        id_funcion: 3,
      }
      await this.comiteService.create(sinodal2);
    }
    if(members.suplente)
    {
      const suplente : CreateComiteDto = {
        id_usuario: members.suplente.id_usuario,
        id_tesis: newTesis.id_tesis,
        id_funcion: 4,
      }
      await this.comiteService.create(suplente);
    }

    return await this.usuarioRepository.findOne({where: {id_usuario: id_usuario}});
  }

  async resetStudentFromExternalStudent(id_usuario: number)
  {
    const url = `http://ciep.ing.uaslp.mx/sesat/student.php?id=${id_usuario}`;
    const user: Usuario = await this.usuarioRepository.findOne({where: {id_usuario: id_usuario}});
    const data = await lastValueFrom(this.httpService.get(url))
    const createFromExternal =  data.data[data.data.length-1];

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
 
    const datosAlumnoData: UpdateDatosAlumnoDto = {
      id_datos_alumno: user.datos_alumno.id_datos_alumno,
      id_modalidad: modalidad,
      id_programa: programa.id_programa,
      id_grado_estudio: gradoEstudio.id_grado_estudio,
      generacion: parseInt(createFromExternal.gen),
      estado_activo: true, //always defaults to true, admin has to turn off manually
      avance_previo: false,
    } 

    const datosAlumno = await this.datosAlumnoService.update(datosAlumnoData);
    const apellidos: string[] = createFromExternal.apellidos.split(" ");

    const updatedUser: UpdateUsuarioDto = {
      id_usuario: user.id_usuario,
      id_rol: 3,
      id_datos_alumno: datosAlumno.id_datos_alumno,
      id_datos_asesor_externo: null,
      password: null,
      nombre: createFromExternal.nombre,
      apellido_paterno: apellidos[0],
      apellido_materno: apellidos[1] ? apellidos[1] : "",
      correo: createFromExternal.email
    }

    const actualUser = await this.update(updatedUser)

    const oldTesis: Tesis = await this.tesisService.findTesisPerStudent(actualUser.id_usuario);
    const oldTesisUpdateDTO: UpdateTesisDto = {
      id_tesis: oldTesis.id_tesis,
      id_usuario: oldTesis.id_usuario,
      titulo: "[Deprecated]" + oldTesis.titulo,
      fecha_registro: oldTesis.fecha_registro,
      generacion: oldTesis.generacion,
      ultimo_avance: oldTesis.ultimo_avance,
      estado_finalizacion: true
    }
    await this.tesisService.update(oldTesisUpdateDTO);

    const newTesisData: CreateTesisDto = {
      id_usuario: user.id_usuario,
      generacion: datosAlumno.generacion,
      estado_finalizacion: false,
      ultimo_avance: 1, ///consultar con alfredo
      titulo: null,
      fecha_registro: null
    }
    await this.tesisService.create(newTesisData);

    const assignmentList = await this.asignacionService.findActiveByTesis(oldTesis.id_tesis)
    console.log("assignment list")
    console.log(assignmentList)
    for(let i = 0; i <= assignmentList.length-1; i++)
    {
      console.log("in for")
      let today = new Date();
      let asignacionUpdateDto: UpdateAsignacionDto = {
        id_asignacion: assignmentList[i].id_asignacion,
        id_formato_evaluacion: assignmentList[i].id_formato_evaluacion,
        id_acta_evaluacion: assignmentList[i].id_acta_evaluacion,
        id_tesis: oldTesis.id_tesis,
        id_modalidad: user.datos_alumno.id_modalidad,
        id_periodo: assignmentList[i].id_periodo,
        num_avance: assignmentList[i].num_avance,
        titulo: "[Closed]" + assignmentList[i].titulo,
        descripcion: assignmentList[i].descripcion,
        fecha_entrega: today.toISOString(),
        estado_entrega: 1,
        calificacion: assignmentList[i].calificacion,
        documento: assignmentList[i].documento,
        retroalimentacion: assignmentList[i].retroalimentacion,
        tipo: assignmentList[i].tipo,
        fecha_presentacion: assignmentList[i].fecha_presentacion
      }
      await this.asignacionService.update(asignacionUpdateDto);
    }

    return actualUser;
  }

  async changeStatus(id: number)
  {
    const user: Usuario = await this.usuarioRepository.findOne({where: {id_usuario: id}});
    const userDatosAlumno : DatosAlumno = await this.datosAlumnoService.findOne(user.id_datos_alumno);
    let updateDatosAlumnoDto: UpdateDatosAlumnoDto;
    
    switch(userDatosAlumno.estado_activo)
    {
      case true:
        updateDatosAlumnoDto = {
          id_datos_alumno: userDatosAlumno.id_datos_alumno,
          id_grado_estudio: userDatosAlumno.id_grado_estudio,
          id_modalidad: userDatosAlumno.id_modalidad,
          id_programa: userDatosAlumno.id_programa,
          generacion: userDatosAlumno.generacion,
          estado_activo: false,
          avance_previo: userDatosAlumno.avance_previo,
        }
        return await this.datosAlumnoService.update(updateDatosAlumnoDto);
        break;
      case false:
        updateDatosAlumnoDto = {
          id_datos_alumno: userDatosAlumno.id_datos_alumno,
          id_grado_estudio: userDatosAlumno.id_grado_estudio,
          id_modalidad: userDatosAlumno.id_modalidad,
          id_programa: userDatosAlumno.id_programa,
          generacion: userDatosAlumno.generacion,
          estado_activo: true,
          avance_previo: userDatosAlumno.avance_previo,
        }
        return await this.datosAlumnoService.update(updateDatosAlumnoDto);
        break;
    }
  }

  async findById(id: number)
  {
    const usuarios: Usuario[] = await this.usuarioRepository.find({
      where: { id_usuario: id },
    });
    return usuarios;
  }

  async findByName(name: string)
  {
    const usuarios: Usuario[] = await this.usuarioRepository.find();
    return usuarios.filter(
      (usuario) => ( `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`)
        .toLowerCase()
        .includes(name.toLowerCase())
    );
  }

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
    for(let i = 1; i <= avancePrevio-1; i++)
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
        tipo: i === 5 && gradoEstudio.nombre_grado_estudio === "Doctorado" ? 2 : 1,
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
        return data.data[data.data.length-1];
      }
    else{
      return null;
    }
  }

  async paginateMasterStudents(options: IPaginationOptions): Promise<Pagination<Usuario>> {
    const alumnosMaestriaQuery = this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoinAndSelect('usuario.datos_alumno', 'datos_alumno')
      .innerJoinAndSelect('datos_alumno.programa', 'programa')
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
      .innerJoinAndSelect('datos_alumno.programa', 'programa')
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
