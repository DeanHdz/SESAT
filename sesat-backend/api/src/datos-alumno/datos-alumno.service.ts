import { Injectable } from '@nestjs/common';
import { CreateDatosAlumnoDto } from './dto/create-datos-alumno.dto';
import { UpdateDatosAlumnoDto } from './dto/update-datos-alumno.dto';

@Injectable()
export class DatosAlumnoService {
  create(createDatosAlumnoDto: CreateDatosAlumnoDto) {
    return 'This action adds a new datosAlumno';
  }

  findAll() {
    return `This action returns all datosAlumno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosAlumno`;
  }

  update(id: number, updateDatosAlumnoDto: UpdateDatosAlumnoDto) {
    return `This action updates a #${id} datosAlumno`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosAlumno`;
  }
}
