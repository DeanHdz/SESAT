import { Injectable } from '@nestjs/common';
import { CreateDatosAsesorExternoDto } from './dto/create-datos-asesor-externo.dto';
import { UpdateDatosAsesorExternoDto } from './dto/update-datos-asesor-externo.dto';

@Injectable()
export class DatosAsesorExternoService {
  create(createDatosAsesorExternoDto: CreateDatosAsesorExternoDto) {
    return 'This action adds a new datosAsesorExterno';
  }

  findAll() {
    return `This action returns all datosAsesorExterno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosAsesorExterno`;
  }

  update(id: number, updateDatosAsesorExternoDto: UpdateDatosAsesorExternoDto) {
    return `This action updates a #${id} datosAsesorExterno`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosAsesorExterno`;
  }
}
