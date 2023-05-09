import { Injectable } from "@nestjs/common";
import { CreateAsignacionDto } from "./dto/create-asignacion.dto";
import { UpdateAsignacionDto } from "./dto/update-asignacion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Asignacion } from "./entities/asignacion.entity";
import { Repository } from "typeorm";

@Injectable()
export class AsignacionService {
  constructor(
    @InjectRepository(Asignacion)
    private asignacionRepository: Repository<Asignacion>
  ) {}

  create(createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionRepository.save(createAsignacionDto);
  }

  findAll() {
    return this.asignacionRepository.find();
  }

  findOne(id: number) {
    return this.asignacionRepository.findOne({ where: { id_asignacion: id } });
  }

  update(updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionRepository.save(updateAsignacionDto);
  }

  remove(id: number) {
    return this.asignacionRepository.delete(id);
  }
}
