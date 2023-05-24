import { Injectable } from "@nestjs/common";
import { CreateAsesorExternoDto } from "./dto/create-asesor-externo.dto";
import { UpdateAsesorExternoDto } from "./dto/update-asesor-externo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AsesorExterno } from "./entities/asesor-externo.entity";
import { Repository } from "typeorm";

@Injectable()
export class AsesorExternoService {
  constructor(
    @InjectRepository(AsesorExterno)
    private asesorRepository: Repository<AsesorExterno>
  ) {}

  create(createAsesorExternoDto: CreateAsesorExternoDto) {
    return this.asesorRepository.save(createAsesorExternoDto);
  }

  findAll() {
    return this.asesorRepository.find();
  }

  findOne(id: number) {
    return this.asesorRepository.findOne({ where: { id_asesor_externo: id } });
  }

  update(updateAsesorExternoDto: UpdateAsesorExternoDto) {
    return this.asesorRepository.save(updateAsesorExternoDto);
  }

  remove(id: number) {
    return this.asesorRepository.delete(id);
  }
}
