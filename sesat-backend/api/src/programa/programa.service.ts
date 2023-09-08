import { Injectable } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';

@Injectable()
export class ProgramaService {
  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
  ) {}
  
  create(createProgramaDto: CreateProgramaDto) {
    return this.programaRepository.save(createProgramaDto);
  }

  findAll() {
    return this.programaRepository.find();
  }

  findOne(id: number) {
    return this.programaRepository.findOne({ where: { id_programa: id } });
  }

  update(updateProgramaDto: UpdateProgramaDto) {
    return this.programaRepository.save(updateProgramaDto);
  }

  remove(id: number) {
    return this.programaRepository.delete(id);
  }
}