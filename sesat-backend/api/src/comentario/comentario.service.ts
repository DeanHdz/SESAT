import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateComentarioDto } from "./dto/create-comentario.dto";
import { UpdateComentarioDto } from "./dto/update-comentario.dto";
import { Comentario } from "./entities/comentario.entity";

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private comentarioRepository: Repository<Comentario>
  ) {}

  create(createComentarioDto: CreateComentarioDto) {
    return this.comentarioRepository.save(createComentarioDto);
  }

  findAll() {
    return this.comentarioRepository.find();
  }

  findOne(id: number) {
    return this.comentarioRepository.findOne({ where: { id_comentario: id } });
  }

  update(updateComentarioDto: UpdateComentarioDto) {
    return this.comentarioRepository.save(updateComentarioDto);
  }

  remove(id: number) {
    return this.comentarioRepository.delete(id);
  }
}
