import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
  ) {}

  create(createAlumnoDto: CreateAlumnoDto) {
    return this.alumnoRepository.save(createAlumnoDto);
  }

  findAll() {
    return this.alumnoRepository.find();
  }

  findOne(id: number) {
    return this.alumnoRepository.findOne({ where: { Clave: id } });
  }

  update(updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoRepository.save(updateAlumnoDto);
  }

  remove(id: number) {
    return this.alumnoRepository.delete(id);
  }
}
