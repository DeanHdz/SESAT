import { Injectable } from '@nestjs/common';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';
import { Repository } from 'typeorm';
import { Asesor } from './entities/asesor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AsesorService {
  constructor(
    @InjectRepository(Asesor)
    private asesorRepository: Repository<Asesor>,
  ) {}

  create(createAsesorDto: CreateAsesorDto) {
    return this.asesorRepository.save(createAsesorDto);
  }

  findAll() {
    return this.asesorRepository.find();
  }

  findOne(id: number) {
    return this.asesorRepository.findOne({ where: { Clave: id } });
  }

  update(updateAsesorDto: UpdateAsesorDto) {
    return this.asesorRepository.save(updateAsesorDto);
  }

  remove(id: number) {
    return this.asesorRepository.delete(id);
  }
}
