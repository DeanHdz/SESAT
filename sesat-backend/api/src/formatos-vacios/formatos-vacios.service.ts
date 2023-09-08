import { Injectable } from "@nestjs/common";
import { CreateFormatosVacioDto } from "./dto/create-formatos-vacio.dto";
import { UpdateFormatosVacioDto } from "./dto/update-formatos-vacio.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FormatosVacios } from "./entities/formatos-vacios.entity";
import { Repository } from "typeorm";

@Injectable()
export class FormatosVaciosService {
  constructor(
    @InjectRepository(FormatosVacios)
    private formatoVacioRepo: Repository<FormatosVacios>
  ) {}

  create(createFormatosVacioDto: CreateFormatosVacioDto) {
    return this.formatoVacioRepo.save(createFormatosVacioDto);
  }

  findAll() {
    return this.formatoVacioRepo.find();
  }

  findOne(id: number) {
    return this.formatoVacioRepo.findOne({ where: { id_formatos_vacios: id } });
  }

  update(updateFormatosVacioDto: UpdateFormatosVacioDto) {
    return this.formatoVacioRepo.save(updateFormatosVacioDto);
  }

  remove(id: number) {
    return this.formatoVacioRepo.delete(id);
  }
}
