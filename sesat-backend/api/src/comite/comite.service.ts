import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { CreateComiteDto } from "./dto/create-comite.dto";
import { UpdateComiteDto } from "./dto/update-comite.dto";
import { Comite } from "./entities/comite.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class ComiteService {
  constructor(
    @InjectRepository(Comite)
    private comiteRepository: Repository<Comite>
  ) {}

  create(CreateComiteDto: CreateComiteDto) {
    return this.comiteRepository.save(CreateComiteDto);
  }

  findAll() {
    return this.comiteRepository.find();
  }

  findOne(id: number) {
    return this.comiteRepository.findOne({ where: { id_comite: id } });
  }

  async findAsesorByIDTesis(id: number) {
    const resp = await this.comiteRepository
    .createQueryBuilder("comite") 

    .select("usuario.nombre")     
    .addSelect("usuario.apellido_paterno")
    .addSelect("usuario.apellido_materno") 

    .from(Usuario, 'usuario')            
    .where('comite.clave_asesor = usuario.clave')  
    .andWhere('comite.id_tesis = :id_tesis', { id_tesis: id })            
    .getRawOne()     // fetch raw results, which will give us one data ROW comibined from all the tables.
                      //otherwise it won't return anything
    return resp;
  }

  findPerAsesor(id: number) {
    return this.comiteRepository.find({ where: { clave_asesor: id }});
  }

  findPerTesis(id: number) {
    return this.comiteRepository.find({ where: { id_tesis: id } });
  }

  update(UpdateComiteDto: UpdateComiteDto) {
    return this.comiteRepository.save(UpdateComiteDto);
  }

  remove(id: number) {
    return this.comiteRepository.delete(id);
  }
}
