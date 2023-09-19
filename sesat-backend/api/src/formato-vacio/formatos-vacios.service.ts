import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormatoVacio } from "./entities/formato-vacio.entity";
import { CreateFormatoVacioDto } from "./dto/create-formato-vacio.dto";
import { UpdateFormatoVacioDto } from "./dto/update-formato-vacio.dto";

@Injectable()
export class FormatosVaciosService {
  constructor(
    @InjectRepository(FormatoVacio)
    private formatoVacioRepo: Repository<FormatoVacio>
  ) {}

  create(createFormatosVacioDto: CreateFormatoVacioDto) {
    return this.formatoVacioRepo.save(createFormatosVacioDto);
  }

  findAll() {
    return this.formatoVacioRepo.find();
  }

  findOne(id: number) {
    return this.formatoVacioRepo.findOne({ where: { id_formato_vacio: id } });
  }

  update(updateFormatosVacioDto: UpdateFormatoVacioDto) {
    return this.formatoVacioRepo.save(updateFormatosVacioDto);
  }

  remove(id: number) {
    return this.formatoVacioRepo.delete(id);
  }
}
