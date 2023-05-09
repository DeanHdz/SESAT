import { Injectable } from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RespuestaService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
  ) {}

  create(createRespuestaDto: CreateRespuestaDto) {
    return this.respuestaRepository.save(createRespuestaDto);
  }

  findAll() {
    return this.respuestaRepository.find();
  }

  findOne(id: number) {
    return this.respuestaRepository.findOne({where: {id_respuesta: id}});
  }

  update(updateRespuestaDto: UpdateRespuestaDto) {
    return this.respuestaRepository.save(updateRespuestaDto);
  }

  remove(id: number) {
    return this.respuestaRepository.delete(id);
  }
}
