import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateComiteDto } from "./dto/create-comite.dto";
import { UpdateComiteDto } from "./dto/update-comite.dto";
import { Comite } from "./entities/comite.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Funcion } from "src/funcion/entities/funcion.entity";

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

      .from(Usuario, "usuario")
      .from(Funcion, "funcion")

      .where("comite.id_usuario = usuario.id_usuario")
      .andWhere("funcion.id_funcion = comite.id_funcion")
      .andWhere("comite.id_tesis = :id_tesis", { id_tesis: id })
      .andWhere("funcion.nombre_funcion = :nombreFunc", {
        nombreFunc: "Asesor",
      })
      .getRawOne(); // fetch raw results, which will give us one data ROW comibined from all the tables.
    //otherwise it won't return anything
    return resp;
  }

  findPerAsesor(id: number) {
    return this.comiteRepository.find({ where: { id_usuario: id } });
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
