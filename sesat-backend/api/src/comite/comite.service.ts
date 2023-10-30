import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateComiteDto } from "./dto/create-comite.dto";
import { UpdateComiteDto } from "./dto/update-comite.dto";
import { Comite } from "./entities/comite.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Funcion } from "src/funcion/entities/funcion.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { group } from "console";

@Injectable()
export class ComiteService {
  constructor(
    @InjectRepository(Comite)
    private comiteRepository: Repository<Comite>,

    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,
  ) { }

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
  //Estados de entrega:
  //EDO 0 -> No entregado
  //EDO 1 -> Entregado
  // EDO 2 -> Vencido
  async findAsignacionesAsesorados(idPeriodo: number, idAsesor: number, idFuncion: number) {


    const subquery = this.comiteRepository
      .createQueryBuilder("c")
      .select("c.id_tesis")
      .where("c.id_usuario = :id_usuario", { id_usuario: idAsesor })
      .andWhere("c.id_funcion = :id_funcion", { id_funcion: idFuncion });

    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
      .select([
        "a.id_asignacion AS id_asignacion",
        "u.nombre AS nombre",
        "u.apellido_paterno AS apellido_paterno",
        "u.apellido_materno AS apellido_materno",
        "a.titulo AS titulo",
        "a.fecha_entrega AS fecha_entrega"])
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "u.id_usuario = t.id_usuario")
      .where(`a.id_tesis IN (${subquery.getQuery()})`)
      .andWhere("a.estado_entrega = :estado_entrega", { estado_entrega: 1 })
      .andWhere("a.id_periodo = :id_periodo", { id_periodo: idPeriodo })
      .setParameters(subquery.getParameters())
      .getRawMany();

    return resp;
  }

  async findMembers(idTesis: number) {
    const resp = await this.comiteRepository
      .createQueryBuilder("c")
      .select([
        "u.nombre AS nombre",
        "u.apellido_paterno AS apellido_paterno",
        "u.apellido_materno AS apellido_materno",
        "f.nombre_funcion AS nombre_funcion",
      ])
      .innerJoin(Usuario, "u", "u.id_usuario = c.id_usuario")
      .innerJoin(Funcion, "f", "f.id_funcion = c.id_funcion")
      .where('c.id_tesis = :id', { id: idTesis })
      .getRawMany();

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
