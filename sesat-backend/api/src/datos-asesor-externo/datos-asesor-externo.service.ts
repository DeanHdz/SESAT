import { Injectable } from "@nestjs/common";
import { CreateDatosAsesorExternoDto } from "./dto/create-datos-asesor-externo.dto";
import { UpdateDatosAsesorExternoDto } from "./dto/update-datos-asesor-externo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DatosAsesorExterno } from "./entities/datos-asesor-externo.entity";
import { Repository } from "typeorm";

@Injectable()
export class DatosAsesorExternoService {
  constructor(
    @InjectRepository(DatosAsesorExterno)
    private datosAsesorExternoRepository: Repository<DatosAsesorExterno>
  ) {}

  create(createDatosAsesorExternoDto: CreateDatosAsesorExternoDto) {
    return this.datosAsesorExternoRepository.save(createDatosAsesorExternoDto);
  }

  findAll() {
    return this.datosAsesorExternoRepository.find();
  }

  findOne(id: number) {
    return this.datosAsesorExternoRepository.findOne({
      where: { id_datos_asesorexterno: id },
    });
  }

  update(updateDatosAsesorExternoDto: UpdateDatosAsesorExternoDto) {
    return this.datosAsesorExternoRepository.save(updateDatosAsesorExternoDto);
  }

  remove(id: number) {
    return this.datosAsesorExternoRepository.delete(id);
  }
}
