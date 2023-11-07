import { Injectable } from "@nestjs/common";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { UpdateEventoDto } from "./dto/update-evento.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Evento } from "./entities/evento.entity";
import { Repository } from "typeorm";
import { CreateEventByTypeDto } from "./dto/create-evento-by-type.dto";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
    private readonly usuarioService: UsuarioService
  ) {}

  async findByUserId(id: number)
  {
    return await this.eventoRepository.find({where: {id_usuario: id}});
  }

  async createAdminEventByType(createEventByTypeDto: CreateEventByTypeDto)
  {
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
            titulo: createEventByTypeDto.title,
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
            titulo: createEventByTypeDto.title,
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
            titulo: createEventByTypeDto.title,
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
      titulo: createEventByTypeDto.title,
      fecha_inicio: startDate,
      fecha_termino: endDate,
    });
    return await this.eventoRepository.save(event);
  }

  create(createEventoDto: CreateEventoDto) {
    let startDate = new Date(createEventoDto.fecha_inicio);
    let endDate = new Date(createEventoDto.fecha_termino);
    return this.eventoRepository.save({
      ...createEventoDto,
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
