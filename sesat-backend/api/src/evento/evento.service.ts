import { Injectable } from "@nestjs/common";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { UpdateEventoDto } from "./dto/update-evento.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Evento } from "./entities/evento.entity";
import { Repository } from "typeorm";
import { CreateEventByTypeDto } from "./dto/create-evento-by-type.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
    private readonly usuarioService: UsuarioService
  ) {}

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
