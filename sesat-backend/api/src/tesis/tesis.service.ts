import { Injectable } from '@nestjs/common';
import { CreateTesisDto } from './dto/create-tesis.dto';
import { UpdateTesisDto } from './dto/update-tesis.dto';
import { Tesis } from './entities/tesis.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TesisService {
  constructor(
    @InjectRepository(Tesis)
    private tesisRepository: Repository<Tesis>,
  ) {}
  
  create(createTesisDto: CreateTesisDto) {
    return this.tesisRepository.save(createTesisDto);
  }

  findAll() {
    return this.tesisRepository.find();
  }

  findOne(id: number) {
    return this.tesisRepository.findOne({ where: { id_tesis: id } });
  }

  update(updateTesisDto: UpdateTesisDto) {
    return this.tesisRepository.save(updateTesisDto);
  }

  remove(id: number) {
    return this.tesisRepository.delete(id);
  }
}
