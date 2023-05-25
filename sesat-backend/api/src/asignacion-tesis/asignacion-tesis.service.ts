import { Injectable } from "@nestjs/common";
import { CreateAsignacionTesiDto } from "./dto/create-asignacion-tesis.dto";
import { UpdateAsignacionTesiDto } from "./dto/update-asignacion-tesis.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AsignacionTesis } from "./entities/asignacion-tesis.entity";
import { Repository } from "typeorm";

@Injectable()
export class AsignacionTesisService {
  constructor(
    @InjectRepository(AsignacionTesis)
    private asignacionTesisRepository: Repository<AsignacionTesis>
  ) {}

  create(createAsignacionTesiDto: CreateAsignacionTesiDto) {
    return this.asignacionTesisRepository.save(createAsignacionTesiDto);
  }

  findAll() {
    return this.asignacionTesisRepository.find();
  }

  findOne(id: number) {
    return this.asignacionTesisRepository.findOne({
      where: { id_asignacion_tesis: id },
    });
  }

  update(updateAsignacionTesiDto: UpdateAsignacionTesiDto) {
    return this.asignacionTesisRepository.save(updateAsignacionTesiDto);
  }

  remove(id: number) {
    return this.asignacionTesisRepository.delete(id);
  }
}
