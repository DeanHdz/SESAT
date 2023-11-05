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

  //Regresar datos de usuario, solo sirve recuperar generacion por el momento
  async fetchByUserId(idAlumno: number) {

    const resp = await this.datosAlumnoRepository.createQueryBuilder('a')
      .select([
        "a.generacion AS generacion"
      ])

      .innerJoin(Usuario, "u", "u.id_datos_alumno = a.id_datos_alumno")

      .where("u.id_usuario = :idUser", { idUser: idAlumno })
      .getRawOne()

    return resp;
  }

  update(updateDatosAlumnoDto: UpdateDatosAlumnoDto) {
    return this.datosAlumnoRepository.save(updateDatosAlumnoDto);
  }

  remove(id: number) {
    return this.datosAlumnoRepository.delete(id);
  }
}
