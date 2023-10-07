import { Injectable } from "@nestjs/common";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { UpdateEventoDto } from "./dto/update-evento.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Evento } from "./entities/evento.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>
  ) {}

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
