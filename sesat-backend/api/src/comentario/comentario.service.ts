import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateComentarioDto } from "./dto/create-comentario.dto";
import { UpdateComentarioDto } from "./dto/update-comentario.dto";
import { Comentario } from "./entities/comentario.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

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

  async findConversationByIdAsignacion(idAsignacion: number){
    const resp = await this.comentarioRepository.createQueryBuilder('c')
      .select([
        'u.nombre AS nombre',
        'u.apellido_paterno AS apellido_paterno',
        'u.apellido_materno AS apellido_materno',
        'c.id_comentario AS id_comentario',
        'c.id_usuario AS id_usuario',
        'c.id_asignacion AS id_asignacion',
        'c.texto AS texto',
        'c.fecha_comentario AS fecha_comentario'            
      ])
      
      .innerJoin(Usuario, "u", "u.id_usuario = c.id_usuario")       

      .where("c.id_asignacion = :id", { id: idAsignacion })                 
      .getRawMany();
    return resp;
  }

  update(updateComentarioDto: UpdateComentarioDto) {
    return this.comentarioRepository.save(updateComentarioDto);
  }

  remove(id: number) {
    return this.comentarioRepository.delete(id);
  }
}
