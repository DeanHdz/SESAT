import { Injectable } from "@nestjs/common";
import { CreateFuncionDto } from "./dto/create-funcion.dto";
import { UpdateFuncionDto } from "./dto/update-funcion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Funcion } from "./entities/funcion.entity";
import { Repository } from "typeorm";

@Injectable()
export class FuncionService {
  constructor(
    @InjectRepository(Funcion)
    private funcionRepository: Repository<Funcion>
  ) {}

  create(createFuncionDto: CreateFuncionDto) {
    return this.funcionRepository.save(createFuncionDto);
  }

  findAll() {
    return this.funcionRepository.find();
  }

  findOne(id: number) {
    return this.funcionRepository.findOne({ where: { id_funcion: id } });
  }

  update(updateFuncionDto: UpdateFuncionDto) {
    return this.funcionRepository.save(updateFuncionDto);
  }

  remove(id: number) {
    return this.funcionRepository.delete(id);
  }
}