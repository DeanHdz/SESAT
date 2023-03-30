import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoAsesorDto } from './dto/create-co-asesor.dto';
import { UpdateCoAsesorDto } from './dto/update-co-asesor.dto';
import { CoAsesor } from './entities/co-asesor.entity';

@Injectable()
export class CoAsesorService {
  constructor(@InjectRepository(CoAsesor)
  private coasesorRepository: Repository<CoAsesor>
  ){

  }
  create(createCoAsesorDto: CreateCoAsesorDto) {
    return this.coasesorRepository.save(createCoAsesorDto);
  }

  findAll() {
    return this.coasesorRepository.find();
  }

  findOne(id: number) {
    return this.coasesorRepository.findOne({where: {Clave: id}});
  }

  update(updateCoAsesorDto: UpdateCoAsesorDto) {
    return this.coasesorRepository.save(updateCoAsesorDto);
  }

  remove(id: number) {
    return this.coasesorRepository.delete(id);
  }
}
