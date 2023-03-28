import { Injectable } from '@nestjs/common';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Injectable()
export class AsignacionService {
  create(createAsignacionDto: CreateAsignacionDto) {
    return 'This action adds a new asignacion';
  }

  findAll() {
    return `This action returns all asignacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asignacion`;
  }

  update(id: number, updateAsignacionDto: UpdateAsignacionDto) {
    return `This action updates a #${id} asignacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} asignacion`;
  }
}
