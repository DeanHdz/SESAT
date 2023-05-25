import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActaEvaluacionDto } from './dto/create-acta-evaluacion.dto';
import { UpdateActaEvaluacionDto } from './dto/update-acta-evaluacion.dto';
import { ActaEvaluacion } from './entities/acta-evaluacion.entity';

@Injectable()
export class ActaEvaluacionService {
  constructor(
    @InjectRepository(ActaEvaluacion)
    private actaEvalRepo: Repository<ActaEvaluacion>,
  ){}

  create(createActaEvaluacionDto: CreateActaEvaluacionDto) {    
    return this.actaEvalRepo.save(createActaEvaluacionDto);
  } 

  findAll() {
    return this.actaEvalRepo.find();
  }
  //cambiar a id asignacion
  findOne(id: number) {
    return this.actaEvalRepo.findOne({where: {id_acta_evaluacion: id}});
  }

  update(updateActaEvaluacionDto: UpdateActaEvaluacionDto) {
    return this.actaEvalRepo.save(updateActaEvaluacionDto);
  }

  remove(id: number) {
    return this.actaEvalRepo.delete(id);
  }
}
