import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Evento } from "./entities/evento.entity";
import { Repository } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>
  ) { }

  create(createEventoDto: CreateEventoDto) {
    return this.eventoRepository.save(createEventoDto);
  }

  findAll() {
    return this.eventoRepository.find();
  }

  findOne(id: number) {
    return this.eventoRepository.findOne({ where: { id_evento: id } });
  }

  update(id: number, updateEventoDto: UpdateEventoDto) {
    return this.eventoRepository.save(updateEventoDto);
  }

  remove(id: number) {
    return this.eventoRepository.delete(id);
  }
}
