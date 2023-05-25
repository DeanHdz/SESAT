import { Injectable } from "@nestjs/common";
import { CreateFormatoEvaluacionDto } from "./dto/create-formato-evaluacion.dto";
import { UpdateFormatoEvaluacionDto } from "./dto/update-formato-evaluacion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FormatoEvaluacion } from "./entities/formato-evaluacion.entity";
import { Repository } from "typeorm";

@Injectable()
export class FormatoEvaluacionService {
  constructor(
    @InjectRepository(FormatoEvaluacion)
    private formatoEvaluacionRepository: Repository<FormatoEvaluacion>
  ) {}

  create(createFormatoEvaluacionDto: CreateFormatoEvaluacionDto) {
    return this.formatoEvaluacionRepository.save(createFormatoEvaluacionDto);
  }

  findAll() {
    return this.formatoEvaluacionRepository.find();
  }

  findOne(id: number) {
    return this.formatoEvaluacionRepository.findOne({
      where: { id_formato_evaluacion: id },
    });
  }

  update(updateFormatoEvaluacionDto: UpdateFormatoEvaluacionDto) {
    return this.formatoEvaluacionRepository.save(updateFormatoEvaluacionDto);
  }

  remove(id: number) {
    return this.formatoEvaluacionRepository.delete(id);
  }
}
