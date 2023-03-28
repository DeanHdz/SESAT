import { Injectable } from '@nestjs/common';
import { CreateCoAsesorDto } from './dto/create-co-asesor.dto';
import { UpdateCoAsesorDto } from './dto/update-co-asesor.dto';

@Injectable()
export class CoAsesorService {
  create(createCoAsesorDto: CreateCoAsesorDto) {
    return 'This action adds a new coAsesor';
  }

  findAll() {
    return `This action returns all coAsesor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coAsesor`;
  }

  update(id: number, updateCoAsesorDto: UpdateCoAsesorDto) {
    return `This action updates a #${id} coAsesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} coAsesor`;
  }
}
