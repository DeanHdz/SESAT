import { Injectable } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Periodo } from './entities/periodo.entity';

@Injectable()
export class PeriodoService {
  constructor(
    @InjectRepository(Periodo)
    private periodoRepository: Repository<Periodo>
  ) {}

  create(createPeriodoDto: CreatePeriodoDto) {
    return this.periodoRepository.save(createPeriodoDto);
  }

  findAll() {
    return this.periodoRepository.find()
  }

  findOne(id: number) {
    return this.periodoRepository.findOne({ where: { id_periodo: id } });
  }

  update(updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodoRepository.save(updatePeriodoDto);
  }

  remove(id: number) {
    return this.periodoRepository.delete(id);
  }
}
