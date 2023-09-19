import { Injectable } from "@nestjs/common";
import { CreateDatosAsesorexternoDto } from "./dto/create-datos-asesorexterno.dto";
import { UpdateDatosAsesorexternoDto } from "./dto/update-datos-asesorexterno.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DatosAsesorexterno } from "./entities/datos-asesorexterno.entity";
import { Repository } from "typeorm";

@Injectable()
export class DatosAsesorexternoService {
  constructor(
    @InjectRepository(DatosAsesorexterno)
    private datosAsesorExternoRepository: Repository<DatosAsesorexterno>
  ) {}

  create(createDatosAsesorexternoDto: CreateDatosAsesorexternoDto) {
    return this.datosAsesorExternoRepository.save(createDatosAsesorexternoDto);
  }

  findAll() {
    return this.datosAsesorExternoRepository.find();
  }

  findOne(id_datos_asesor_externo: number) {
    return this.datosAsesorExternoRepository.findOne({
      where: { id_datos_asesor_externo: id_datos_asesor_externo },
    });
  }

  update(updateDatosAsesorexternoDto: UpdateDatosAsesorexternoDto) {
    return this.datosAsesorExternoRepository.save(updateDatosAsesorexternoDto);
  }

  remove(id: number) {
    return this.datosAsesorExternoRepository.delete(id);
  }
}
