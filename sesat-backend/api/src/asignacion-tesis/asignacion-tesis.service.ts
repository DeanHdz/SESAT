import { Injectable } from "@nestjs/common";
import { CreateAsignacionTesiDto } from "./dto/create-asignacion-tesis.dto";
import { UpdateAsignacionTesiDto } from "./dto/update-asignacion-tesis.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AsignacionTesis } from "./entities/asignacion-tesis.entity";
import { Repository } from "typeorm";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";

@Injectable()
export class AsignacionTesisService {
  constructor(
    @InjectRepository(AsignacionTesis)
    private asignacionTesisRepository: Repository<AsignacionTesis>
  ) {}

  create(createAsignacionTesiDto: CreateAsignacionTesiDto) {
    return this.asignacionTesisRepository.save(createAsignacionTesiDto);
  }

  findAll() {
    return this.asignacionTesisRepository.find();
  }

  findOne(id: number) {
    return this.asignacionTesisRepository.findOne({
      where: { id_asignacion_tesis: id },
    });
  }

  async findDocumentByID(id: number) {
    const resp = await this.asignacionTesisRepository
    .createQueryBuilder("asig_tesis") 
    .select("asignacion.documento")     
        
    .from(Asignacion, 'asignacion') 
    .from(Tesis, 'tesis')       

    .where('asig_tesis.id_tesis = tesis.id_tesis')   
    .andWhere('asig_tesis.id_asignacion = asignacion.id_asignacion')    
    .andWhere('tesis.ultimo_avance = asignacion.num_avance')

    .andWhere('tesis.id_tesis = :id_tesis', { id_tesis: id })   
    .getRawOne()     // fetch raw results, which will give us one data ROW comibined from all the tables.
                      //otherwise it won't return anything
    return resp;
  }

  update(updateAsignacionTesiDto: UpdateAsignacionTesiDto) {
    return this.asignacionTesisRepository.save(updateAsignacionTesiDto);
  }

  remove(id: number) {
    return this.asignacionTesisRepository.delete(id);
  }
}
