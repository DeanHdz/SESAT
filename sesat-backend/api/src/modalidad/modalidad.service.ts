import { Injectable } from '@nestjs/common';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modalidad } from './entities/modalidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModalidadService {
  constructor(
    @InjectRepository(Modalidad)
    private modalidadRepository: Repository<Modalidad>,
  ) {}

  create(createModalidadDto: CreateModalidadDto) {
    return this.modalidadRepository.save(createModalidadDto);
  }

  findAll() {
    return this.modalidadRepository.find();
  }

  findOne(id: number) {
    return this.modalidadRepository.findOne({where: {id_modalidad: id}});
  }

  update(id: number, updateModalidadDto: UpdateModalidadDto) {
    return this.modalidadRepository.save(updateModalidadDto);
  }

  remove(id: number) {
    return this.modalidadRepository.delete(id);
  }
}
