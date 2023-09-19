import { Injectable } from '@nestjs/common';
import { CreateGradoEstudioDto } from './dto/create-grado-estudio.dto';
import { UpdateGradoEstudioDto } from './dto/update-grado-estudio.dto';
import { GradoEstudio } from './entities/grado-estudio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GradoEstudioService {
  constructor(
    @InjectRepository(GradoEstudio)
    private gradoEstudioRepository: Repository<GradoEstudio>,
  ) {}

  create(createGradoEstudioDto: CreateGradoEstudioDto) {
    return this.gradoEstudioRepository.save(createGradoEstudioDto);
  }

  findAll() {
    return this.gradoEstudioRepository.find();
  }

  findOne(id: number) {
    return this.gradoEstudioRepository.findOne({where: {id_grado_estudio: id}});
  }

  update(id: number, updateGradoEstudioDto: UpdateGradoEstudioDto) {
    return this.gradoEstudioRepository.save(updateGradoEstudioDto);
  }

  remove(id: number) {
    return this.gradoEstudioRepository.delete(id);
  }
}
