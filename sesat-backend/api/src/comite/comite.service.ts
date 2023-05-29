import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { CreateComiteDto } from "./dto/create-comite.dto";
import { UpdateComiteDto } from "./dto/update-comite.dto";
import { Comite } from "./entities/comite.entity";

@Injectable()
export class ComiteService {
  constructor(
    @InjectRepository(Comite)
    private comiteRepository: Repository<Comite>
  ) {}

  create(CreateComiteDto: CreateComiteDto) {
    return this.comiteRepository.save(CreateComiteDto);
  }

  findAll() {
    return this.comiteRepository.find();
  }

  findOne(id: number) {
    return this.comiteRepository.findOne({ where: { id_comite: id } });
  }

  findPerAsesor(id: number) {
    return this.comiteRepository.find({ where: { clave_asesor: id }});
  }

  findPerTesis(id: number) {
    return this.comiteRepository.find({ where: { id_tesis: id } });
  }

  update(UpdateComiteDto: UpdateComiteDto) {
    return this.comiteRepository.save(UpdateComiteDto);
  }

  remove(id: number) {
    return this.comiteRepository.delete(id);
  }
}
