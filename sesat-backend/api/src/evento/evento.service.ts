import { Injectable } from "@nestjs/common";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { UpdateEventoDto } from "./dto/update-evento.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Evento } from "./entities/evento.entity";
import { Repository } from "typeorm";
import { CreateEventByTypeDto } from "./dto/create-evento-by-type.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { AsesorEventDto } from "./dto/asesor-evento-dto";
import { ComiteService } from "src/comite/comite.service";
import { RetrievedCommitteeDTO } from "src/comite/dto/retrieved-committee.dto";
import { AsignacionService } from "src/asignacion/asignacion.service";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { UpdateAsignacionDto } from "src/asignacion/dto/update-asignacion.dto";

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
    private readonly usuarioService: UsuarioService,
    private readonly comiteService: ComiteService,
    private readonly asignacionService: AsignacionService
  ) {}

  async postAsesorEvent(asesorEventDto: AsesorEventDto){
    console.log("in post Asesor")
    console.log(asesorEventDto)
    const salt = new Date().toISOString();
    const committee: RetrievedCommitteeDTO = await this.comiteService.retrieveCommittee(asesorEventDto.id_tesis);
    const student: Usuario = await this.usuarioService.findStudentByTesisId(asesorEventDto.id_tesis);

    //also creates for owner
    if(committee.asesor)
    {
      const event = this.eventoRepository.create({
        id_usuario: committee.asesor.id_usuario,
        id_creador: asesorEventDto.id_usuario,
        titulo: asesorEventDto.title + "!!" + salt,
        fecha_inicio: asesorEventDto.start,
        fecha_termino: asesorEventDto.end,
      });
      await this.eventoRepository.save(event);
      console.log("created for asesor")
    }
    
    if(committee.coasesor)
    {
      const event = this.eventoRepository.create({
        id_usuario: committee.coasesor.id_usuario,
        id_creador: asesorEventDto.id_usuario,
        titulo: asesorEventDto.title + "!!" + salt,
        fecha_inicio: asesorEventDto.start,
        fecha_termino: asesorEventDto.end,
      });
      await this.eventoRepository.save(event);
    }

    if(committee.sinodal1)
    {
      const event = this.eventoRepository.create({
        id_usuario: committee.sinodal1.id_usuario,
        id_creador: asesorEventDto.id_usuario,
        titulo: asesorEventDto.title + "!!" + salt,
        fecha_inicio: asesorEventDto.start,
        fecha_termino: asesorEventDto.end,
      });
      await this.eventoRepository.save(event);
    }

    if(committee.sinodal2)
    {
      const event = this.eventoRepository.create({
        id_usuario: committee.sinodal2.id_usuario,
        id_creador: asesorEventDto.id_usuario,
        titulo: asesorEventDto.title + "!!" + salt,
        fecha_inicio: asesorEventDto.start,
        fecha_termino: asesorEventDto.end,
      });
      await this.eventoRepository.save(event);
    }

    if(committee.sinodal3)
    {
      const event = this.eventoRepository.create({
        id_usuario: committee.sinodal3.id_usuario,
        id_creador: asesorEventDto.id_usuario,
        titulo: asesorEventDto.title + "!!" + salt,
        fecha_inicio: asesorEventDto.start,
        fecha_termino: asesorEventDto.end,
      });
      await this.eventoRepository.save(event);
    }

    if(committee.sinodal4)
    {
      const event = this.eventoRepository.create({
        id_usuario: committee.sinodal4.id_usuario,
        id_creador: asesorEventDto.id_usuario,
        titulo: asesorEventDto.title + "!!" + salt,
        fecha_inicio: asesorEventDto.start,
        fecha_termino: asesorEventDto.end,
      });
      await this.eventoRepository.save(event);
    }

    if(committee.suplente)
    {
      const event = this.eventoRepository.create({
        id_usuario: committee.suplente.id_usuario,
        id_creador: asesorEventDto.id_usuario,
        titulo: asesorEventDto.title + "!!" + salt,
        fecha_inicio: asesorEventDto.start,
        fecha_termino: asesorEventDto.end,
      });
      await this.eventoRepository.save(event);
    }

    const event = this.eventoRepository.create({
      id_usuario: student.id_usuario,
      id_creador: asesorEventDto.id_usuario,
      titulo: asesorEventDto.title + "!!" + salt,
      fecha_inicio: asesorEventDto.start,
      fecha_termino: asesorEventDto.end,
    });
    const createdEvent = await this.eventoRepository.save(event);

    if(asesorEventDto.presentation === true)
    {
      const assignments: Asignacion[] = await this.asignacionService.findActiveByTesis(asesorEventDto.id_tesis);
      for(let i = 0; i < assignments.length; i++)
      {
        const updateAsignacionDto: UpdateAsignacionDto = {
          id_asignacion: assignments[i].id_asignacion,
          id_formato_evaluacion: assignments[i].id_formato_evaluacion,
          id_acta_evaluacion: assignments[i].id_acta_evaluacion,
          id_tesis: assignments[i].id_tesis,
          id_modalidad: assignments[i].id_modalidad,
          id_periodo: assignments[i].id_periodo,
          num_avance: assignments[i].num_avance,
          titulo: assignments[i].titulo,
          descripcion: assignments[i].descripcion,
          fecha_entrega: assignments[i].fecha_entrega,
          calificacion: assignments[i].calificacion,
          documento: assignments[i].documento,
          estado_entrega: assignments[i].estado_entrega,
          retroalimentacion: assignments[i].retroalimentacion,
          tipo: assignments[i].tipo,
          fecha_presentacion: asesorEventDto.start, //does this work?? cunt
        }
        await this.asignacionService.update(updateAsignacionDto);
      }
    }
    return createdEvent;
  }

  async getParticipants(title: string)
  {
    const eventList: Evento[] = await this.findAllThatShareTitle(title);
    const userList: Usuario[] = [];
    for(let i = 0; i < eventList.length; i++)
    {
      userList.push(await this.usuarioService.findOne(eventList[i].id_usuario))
    }
    return userList;
  }

  async deleteAllThatShareTitle(title: string){
    const list: Evento[] = await this.findAllThatShareTitle(title);
    for(let i = 0; i < list.length; i++)
    {
      await this.eventoRepository.delete(list[i].id_evento);
    }
    return list[0];
  }

  async findAllThatShareTitle(title: string) {
    return await this.eventoRepository.find({ where: { titulo: title } });
  }

  async findByUserId(id: number)
  {
    return await this.eventoRepository.find({where: {id_usuario: id}});
  }

  async createAdminEventByType(createEventByTypeDto: CreateEventByTypeDto)
  {
    const salt = new Date().toISOString();
    let startDate = new Date(createEventByTypeDto.start);
    let endDate = new Date(createEventByTypeDto.end);
    switch(createEventByTypeDto.type)
    {
      case 1:
        const alumnos = await this.usuarioService.findAlumnos();
        for(let i=0; i < alumnos.length; i++)
        {
          const event = this.eventoRepository.create({
            id_usuario: alumnos[i].id_usuario,
            id_creador: createEventByTypeDto.id_creador,
            titulo: createEventByTypeDto.title + "!!" + salt,
            fecha_inicio: startDate,
            fecha_termino: endDate,
          });
          await this.eventoRepository.save(event);
        }
        break;
      case 2:
        const asesores = await this.usuarioService.findAlumnos();
        for(let i=0; i < asesores.length; i++)
        {
          const event = this.eventoRepository.create({
            id_usuario: asesores[i].id_usuario,
            id_creador: createEventByTypeDto.id_creador,
            titulo: createEventByTypeDto.title + "!!" + salt,
            fecha_inicio: startDate,
            fecha_termino: endDate,
          });
          await this.eventoRepository.save(event);
        }
        break;
      case 3:
        for(let i=0; i < createEventByTypeDto.users.length; i++)
        {
          const event = this.eventoRepository.create({
            id_usuario: createEventByTypeDto.users[i].id_usuario,
            id_creador: createEventByTypeDto.id_creador,
            titulo: createEventByTypeDto.title + "!!" + salt,
            fecha_inicio: startDate,
            fecha_termino: endDate,
          });
          await this.eventoRepository.save(event);
        }
        break;
    }

    const event = this.eventoRepository.create({
      id_usuario: createEventByTypeDto.id,
      id_creador: createEventByTypeDto.id_creador,
      titulo: createEventByTypeDto.title + "!!" + salt,
      fecha_inicio: startDate,
      fecha_termino: endDate,
    });
    return await this.eventoRepository.save(event);
  }

  create(createEventoDto: CreateEventoDto) {
    const salt = new Date().toISOString();
    const startDate = new Date(createEventoDto.fecha_inicio);
    const endDate = new Date(createEventoDto.fecha_termino);
    const title = createEventoDto.titulo + "!!" + salt;

    return this.eventoRepository.save({
      ...createEventoDto,
      titulo: title,
      fecha_inicio: startDate,
      fecha_termino: endDate,
    });
  }

  findAll() {
    return this.eventoRepository.find();
  }

  findOne(id: number) {
    return this.eventoRepository.findOne({ where: { id_evento: id } });
  }

  update(updateEventoDto: UpdateEventoDto) {
    return this.eventoRepository.save(updateEventoDto);
  }

  remove(id: number) {
    return this.eventoRepository.delete(id);
  }
}
