import { Injectable } from "@nestjs/common";
import { CreateVariablesSistemaDto } from "./dto/create-variables-sistema.dto";
import { UpdateVariablesSistemaDto } from "./dto/update-variables-sistema.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { VariablesSistema } from "./entities/variables-sistema.entity";
import { Repository } from "typeorm";

@Injectable()
export class VariablesSistemaService {
  constructor(
    @InjectRepository(VariablesSistema)
    private variablesSistemaRepository: Repository<VariablesSistema>
  ) {}

  create(createVariablesSistemaDto: CreateVariablesSistemaDto) {
    return this.variablesSistemaRepository.save(createVariablesSistemaDto);
  }

  findAll() {
    return this.variablesSistemaRepository.find();
  }

  findOne(id: number) {
    return this.variablesSistemaRepository.findOne({
      where: { id_variables_sistema: id },
    });
  }

  update(updateVariablesSistemaDto: UpdateVariablesSistemaDto) {
    return this.variablesSistemaRepository.save(updateVariablesSistemaDto);
  }

  remove(id: number) {
    return this.variablesSistemaRepository.delete(id);
  }
}
