import { Injectable } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Periodo } from './entities/periodo.entity';
import { formatAsISODate } from 'src/utils/utils';

@Injectable()
export class PeriodoService {
  constructor(
    @InjectRepository(Periodo)
    private periodoRepository: Repository<Periodo>
  ) { }

  create(createPeriodoDto: CreatePeriodoDto) {
    return this.periodoRepository.save(createPeriodoDto);
  }

  findAll() {
    return this.periodoRepository.find()
  }

  findOne(id: number) {
    return this.periodoRepository.findOne({ where: { id_periodo: id } });
  }

  //Obtener el ultimo periodo creado
  async findLatestPeriod() {
    const result = await this.periodoRepository
      .createQueryBuilder('p')
      .select([
        'p.id_periodo',
        'p.fecha_apertura',
        'p.fecha_cierre',
        'p.fecha_apertura_opc',
        'p.fecha_cierre_opc',
      ])
      .orderBy('p.id_periodo', 'DESC')
      .limit(1)
      .getOne();

    // hora del servidor
    const serverTime = new Date();

    // incluir hora del servidor en la respuesta
    const response = {
      id_periodo: result.id_periodo,
      fecha_apertura: result.fecha_apertura,
      fecha_cierre: result.fecha_cierre,
      fecha_apertura_opc: result.fecha_apertura_opc,
      fecha_cierre_opc: result.fecha_cierre_opc,
      server_time: serverTime.toISOString()
    };

    return response;
  }



  update(updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodoRepository.save(updatePeriodoDto);
  }

  remove(id: number) {
    return this.periodoRepository.delete(id);
  }
}
