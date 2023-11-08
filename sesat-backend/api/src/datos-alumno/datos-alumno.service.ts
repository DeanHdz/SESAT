import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDatosAlumnoDto } from './dto/create-datos-alumno.dto';
import { UpdateDatosAlumnoDto } from './dto/update-datos-alumno.dto';
import { DatosAlumno } from './entities/datos-alumno.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class DatosAlumnoService {

  constructor(
    @InjectRepository(DatosAlumno)
    private datosAlumnoRepository: Repository<DatosAlumno>
  ) {}

  create(createDatosAlumnoDto: CreateDatosAlumnoDto) {
    return this.datosAlumnoRepository.save(createDatosAlumnoDto);
  }

  findAll() {
    return this.datosAlumnoRepository.find();
  }

  findOne(id: number) {
    return this.datosAlumnoRepository.findOne({ where: {id_datos_alumno: id} });
  }



  update(updateDatosAlumnoDto: UpdateDatosAlumnoDto) {
    return this.datosAlumnoRepository.save(updateDatosAlumnoDto);
  }

  remove(id: number) {
    return this.datosAlumnoRepository.delete(id);
  }
}
