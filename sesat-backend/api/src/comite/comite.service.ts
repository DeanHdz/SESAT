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
import { DatosAlumno } from "src/datos-alumno/entities/datos-alumno.entity";
import { RetrievedCommitteeDTO } from "./dto/retrieved-committee.dto";
import { TesisService } from "src/tesis/tesis.service";
import { CreateRetrievedCommitteeDTO } from "./dto/create-retrieved-committee.dto";
import { TesisRegistryDTO } from "./dto/tesis-registry.dto";
import { UpdateTesisDto } from "src/tesis/dto/update-tesis.dto";

@Injectable()
export class ComiteService {
  constructor(
    @InjectRepository(Comite)
    private comiteRepository: Repository<Comite>,

    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,
    
    private readonly tesisService: TesisService,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  async postTesisRegistry(tesisRegistryDTO: TesisRegistryDTO)
  {
    const today = new Date();
    const asesorSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(1, tesisRegistryDTO.id_tesis);
    const coasesorSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(2, tesisRegistryDTO.id_tesis);
    const sinodalesSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(3, tesisRegistryDTO.id_tesis);
    const suplenteSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(4, tesisRegistryDTO.id_tesis);

    const usuario: Usuario = await this.usuarioRepository.findOne({where: {id_usuario: tesisRegistryDTO.id_usuario}});

    const tesis: Tesis = await this.tesisService.findOne(tesisRegistryDTO.id_tesis);
    const updateTesisDto: UpdateTesisDto = {
      id_tesis: tesisRegistryDTO.id_tesis,
      id_usuario: tesisRegistryDTO.id_usuario,
      titulo: tesisRegistryDTO.titulo,
      fecha_registro: today,
      generacion: tesis.generacion,
      ultimo_avance: tesis.ultimo_avance,
      estado_finalizacion: tesis.estado_finalizacion
    }   
    const newTesis = await this.tesisService.update(updateTesisDto);
    //Cumite shit
    if(asesorSpoof && asesorSpoof[0] && asesorSpoof[0].asesor) //si ya tenia uno, actualizar
    {
      const updateCommitteeAsesor: UpdateComiteDto = {
        id_comite: asesorSpoof[0].id_comite,
        id_usuario: tesisRegistryDTO.asesor ? tesisRegistryDTO.asesor.id_usuario : 0,
        id_tesis: tesisRegistryDTO.id_tesis,
        id_funcion: 1,
      }
      this.update(updateCommitteeAsesor);
    } //sino, crear
    else{
      const createCommitteeAsesor: CreateComiteDto = {
        id_usuario: tesisRegistryDTO.asesor ? tesisRegistryDTO.asesor.id_usuario : 0,
        id_tesis: tesisRegistryDTO.id_tesis,
        id_funcion: 1,
      }
      this.create(createCommitteeAsesor);
    } 

    if(coasesorSpoof && coasesorSpoof[0] && coasesorSpoof[0].asesor) //si ya tenia uno, actualizar
    {
      const updateCommitteeCoasesor: UpdateComiteDto = {
        id_comite: coasesorSpoof[0].id_comite,
        id_usuario: tesisRegistryDTO.coasesor ? tesisRegistryDTO.coasesor.id_usuario : 0,
        id_tesis: tesisRegistryDTO.id_tesis,
        id_funcion: 2,
      }
      this.update(updateCommitteeCoasesor);
    } //sino, crear
    else{
      if(tesisRegistryDTO.coasesor){
        const createCommitteeCoasesor: CreateComiteDto = {
          id_usuario: tesisRegistryDTO.coasesor ? tesisRegistryDTO.coasesor.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 2,
        }
        this.create(createCommitteeCoasesor);
      }
    }

    if(suplenteSpoof && suplenteSpoof[0] && suplenteSpoof[0].asesor) //si ya tenia uno, actualizar
    {
      const updateCommitteeSuplente: UpdateComiteDto = {
        id_comite: suplenteSpoof[0].id_comite,
        id_usuario: tesisRegistryDTO.suplente ? tesisRegistryDTO.suplente.id_usuario : 0,
        id_tesis: tesisRegistryDTO.id_tesis,
        id_funcion: 4,
      }
      this.update(updateCommitteeSuplente);
    } //sino, crear
    else{
      const createCommitteeSuplente: CreateComiteDto = {
        id_usuario: tesisRegistryDTO.suplente ? tesisRegistryDTO.suplente.id_usuario : 0,
        id_tesis: tesisRegistryDTO.id_tesis,
        id_funcion: 4,
      }
      this.create(createCommitteeSuplente);
    }

    if(usuario.datos_alumno.id_grado_estudio == 1)
    {
      if(sinodalesSpoof && sinodalesSpoof[0] && sinodalesSpoof[0].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal1: UpdateComiteDto = {
          id_comite: sinodalesSpoof[0].id_comite,
          id_usuario: tesisRegistryDTO.sinodal1 ? tesisRegistryDTO.sinodal1.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal1);
      } //sino, crear
      else{
        const createCommitteeSinodal1: CreateComiteDto = {
          id_usuario: tesisRegistryDTO.sinodal1 ? tesisRegistryDTO.sinodal1.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal1);
      }

      if(sinodalesSpoof && sinodalesSpoof[1] && sinodalesSpoof[1].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal2: UpdateComiteDto = {
          id_comite: sinodalesSpoof[1].id_comite,
          id_usuario: tesisRegistryDTO.sinodal2 ? tesisRegistryDTO.sinodal2.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal2);
      } //sino, crear
      else{
        const createCommitteeSinodal2: CreateComiteDto = {
          id_usuario: tesisRegistryDTO.sinodal2 ? tesisRegistryDTO.sinodal2.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal2);
      }
    }else{
      if(sinodalesSpoof && sinodalesSpoof[0] && sinodalesSpoof[0].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal1: UpdateComiteDto = {
          id_comite: sinodalesSpoof[0].id_comite,
          id_usuario: tesisRegistryDTO.sinodal1 ? tesisRegistryDTO.sinodal1.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal1);
      } //sino, crear
      else{
        const createCommitteeSinodal1: CreateComiteDto = {
          id_usuario: tesisRegistryDTO.sinodal1 ? tesisRegistryDTO.sinodal1.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal1);
      }

      if(sinodalesSpoof && sinodalesSpoof[1] && sinodalesSpoof[1].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal2: UpdateComiteDto = {
          id_comite: sinodalesSpoof[1].id_comite,
          id_usuario: tesisRegistryDTO.sinodal2 ? tesisRegistryDTO.sinodal2.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal2);
      } //sino, crear
      else{
        const createCommitteeSinodal2: CreateComiteDto = {
          id_usuario: tesisRegistryDTO.sinodal2 ? tesisRegistryDTO.sinodal2.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal2);
      }

      if(sinodalesSpoof && sinodalesSpoof[2] && sinodalesSpoof[2].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal3: UpdateComiteDto = {
          id_comite: sinodalesSpoof[2].id_comite,
          id_usuario: tesisRegistryDTO.sinodal3 ? tesisRegistryDTO.sinodal3.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal3);
      } //sino, crear
      else{
        const createCommitteeSinodal3: CreateComiteDto = {
          id_usuario: tesisRegistryDTO.sinodal3 ? tesisRegistryDTO.sinodal3.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal3);
      }

      if(sinodalesSpoof && sinodalesSpoof[3] && sinodalesSpoof[3].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal4: UpdateComiteDto = {
          id_comite: sinodalesSpoof[3].id_comite,
          id_usuario: tesisRegistryDTO.sinodal4 ? tesisRegistryDTO.sinodal4.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal4);
      } //sino, crear
      else{
        const createCommitteeSinodal4: CreateComiteDto = {
          id_usuario: tesisRegistryDTO.sinodal4 ? tesisRegistryDTO.sinodal4.id_usuario : 0,
          id_tesis: tesisRegistryDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal4);
      }
    }
    return newTesis;
  }

  async findAsesorTesisList(id_usuario: number)
  {
    const listOfCommitteeMembership = await this.comiteRepository.find({where: {id_usuario: id_usuario, id_funcion: 1}})
    const listOfTheses: Tesis[] = [];
    for(let i = 0; i < listOfCommitteeMembership.length; i++)
    {
      listOfTheses.push(await this.tesisService.findOne(listOfCommitteeMembership[i].id_tesis));
    }
    
    return listOfTheses.filter((tesis) => tesis.estado_finalizacion == false)
  }

  async updateCommitteeWithRetrieved(createRetrievedCommitteeDTO: CreateRetrievedCommitteeDTO)
  {
    const asesorSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(1, createRetrievedCommitteeDTO.id_tesis);
    const coasesorSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(2, createRetrievedCommitteeDTO.id_tesis);
    const sinodalesSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(3, createRetrievedCommitteeDTO.id_tesis);
    const suplenteSpoof: Comite[] = await this.retrieveCommitteeMemberByRole(4, createRetrievedCommitteeDTO.id_tesis);

    const usuario: Usuario = await this.usuarioRepository.findOne({where: {id_usuario: createRetrievedCommitteeDTO.id_usuario}});

    if(asesorSpoof && asesorSpoof[0] && asesorSpoof[0].asesor) //si ya tenia uno, actualizar
    {
      const updateCommitteeAsesor: UpdateComiteDto = {
        id_comite: asesorSpoof[0].id_comite,
        id_usuario: createRetrievedCommitteeDTO.asesor ? createRetrievedCommitteeDTO.asesor.id_usuario : 0,
        id_tesis: createRetrievedCommitteeDTO.id_tesis,
        id_funcion: 1,
      }
      this.update(updateCommitteeAsesor);
    } //sino, crear
    else{
      const createCommitteeAsesor: CreateComiteDto = {
        id_usuario: createRetrievedCommitteeDTO.asesor ? createRetrievedCommitteeDTO.asesor.id_usuario : 0,
        id_tesis: createRetrievedCommitteeDTO.id_tesis,
        id_funcion: 1,
      }
      this.create(createCommitteeAsesor);
    } 

    if(coasesorSpoof && coasesorSpoof[0] && coasesorSpoof[0].asesor) //si ya tenia uno, actualizar
    {
      const updateCommitteeCoasesor: UpdateComiteDto = {
        id_comite: coasesorSpoof[0].id_comite,
        id_usuario: createRetrievedCommitteeDTO.coasesor ? createRetrievedCommitteeDTO.coasesor.id_usuario : 0,
        id_tesis: createRetrievedCommitteeDTO.id_tesis,
        id_funcion: 2,
      }
      this.update(updateCommitteeCoasesor);
    } //sino, crear
    else{
      if(createRetrievedCommitteeDTO.coasesor){
        const createCommitteeCoasesor: CreateComiteDto = {
          id_usuario: createRetrievedCommitteeDTO.coasesor ? createRetrievedCommitteeDTO.coasesor.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 2,
        }
        this.create(createCommitteeCoasesor);
      }
    }

    if(suplenteSpoof && suplenteSpoof[0] && suplenteSpoof[0].asesor) //si ya tenia uno, actualizar
    {
      const updateCommitteeSuplente: UpdateComiteDto = {
        id_comite: suplenteSpoof[0].id_comite,
        id_usuario: createRetrievedCommitteeDTO.suplente ? createRetrievedCommitteeDTO.suplente.id_usuario : 0,
        id_tesis: createRetrievedCommitteeDTO.id_tesis,
        id_funcion: 4,
      }
      this.update(updateCommitteeSuplente);
    } //sino, crear
    else{
      const createCommitteeSuplente: CreateComiteDto = {
        id_usuario: createRetrievedCommitteeDTO.suplente ? createRetrievedCommitteeDTO.suplente.id_usuario : 0,
        id_tesis: createRetrievedCommitteeDTO.id_tesis,
        id_funcion: 4,
      }
      this.create(createCommitteeSuplente);
    }

    if(usuario.datos_alumno.id_grado_estudio == 1)
    {
      if(sinodalesSpoof && sinodalesSpoof[0] && sinodalesSpoof[0].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal1: UpdateComiteDto = {
          id_comite: sinodalesSpoof[0].id_comite,
          id_usuario: createRetrievedCommitteeDTO.sinodal1 ? createRetrievedCommitteeDTO.sinodal1.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal1);
      } //sino, crear
      else{
        const createCommitteeSinodal1: CreateComiteDto = {
          id_usuario: createRetrievedCommitteeDTO.sinodal1 ? createRetrievedCommitteeDTO.sinodal1.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal1);
      }

      if(sinodalesSpoof && sinodalesSpoof[1] && sinodalesSpoof[1].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal2: UpdateComiteDto = {
          id_comite: sinodalesSpoof[1].id_comite,
          id_usuario: createRetrievedCommitteeDTO.sinodal2 ? createRetrievedCommitteeDTO.sinodal2.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal2);
      } //sino, crear
      else{
        const createCommitteeSinodal2: CreateComiteDto = {
          id_usuario: createRetrievedCommitteeDTO.sinodal2 ? createRetrievedCommitteeDTO.sinodal2.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal2);
      }
    }else{
      if(sinodalesSpoof && sinodalesSpoof[0] && sinodalesSpoof[0].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal1: UpdateComiteDto = {
          id_comite: sinodalesSpoof[0].id_comite,
          id_usuario: createRetrievedCommitteeDTO.sinodal1 ? createRetrievedCommitteeDTO.sinodal1.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal1);
      } //sino, crear
      else{
        const createCommitteeSinodal1: CreateComiteDto = {
          id_usuario: createRetrievedCommitteeDTO.sinodal1 ? createRetrievedCommitteeDTO.sinodal1.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal1);
      }

      if(sinodalesSpoof && sinodalesSpoof[1] && sinodalesSpoof[1].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal2: UpdateComiteDto = {
          id_comite: sinodalesSpoof[1].id_comite,
          id_usuario: createRetrievedCommitteeDTO.sinodal2 ? createRetrievedCommitteeDTO.sinodal2.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal2);
      } //sino, crear
      else{
        const createCommitteeSinodal2: CreateComiteDto = {
          id_usuario: createRetrievedCommitteeDTO.sinodal2 ? createRetrievedCommitteeDTO.sinodal2.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal2);
      }

      if(sinodalesSpoof && sinodalesSpoof[2] && sinodalesSpoof[2].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal3: UpdateComiteDto = {
          id_comite: sinodalesSpoof[2].id_comite,
          id_usuario: createRetrievedCommitteeDTO.sinodal3 ? createRetrievedCommitteeDTO.sinodal3.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal3);
      } //sino, crear
      else{
        const createCommitteeSinodal3: CreateComiteDto = {
          id_usuario: createRetrievedCommitteeDTO.sinodal3 ? createRetrievedCommitteeDTO.sinodal3.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal3);
      }

      if(sinodalesSpoof && sinodalesSpoof[3] && sinodalesSpoof[3].asesor) //si ya tenia uno, actualizar
      {
        const updateCommitteeSinodal4: UpdateComiteDto = {
          id_comite: sinodalesSpoof[3].id_comite,
          id_usuario: createRetrievedCommitteeDTO.sinodal4 ? createRetrievedCommitteeDTO.sinodal4.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.update(updateCommitteeSinodal4);
      } //sino, crear
      else{
        const createCommitteeSinodal4: CreateComiteDto = {
          id_usuario: createRetrievedCommitteeDTO.sinodal4 ? createRetrievedCommitteeDTO.sinodal4.id_usuario : 0,
          id_tesis: createRetrievedCommitteeDTO.id_tesis,
          id_funcion: 3,
        }
        this.create(createCommitteeSinodal4);
      }
    }

    return await this.retrieveCommittee(createRetrievedCommitteeDTO.id_tesis);
  }

  async retrieveCommittee(id_tesis: number)
  {
    // 1: Asesor 2: Co-asesor 3: Sinodal 4: Suplente
    const asesor: Comite[] = await this.retrieveCommitteeMemberByRole(1, id_tesis);
    const coasesor: Comite[] = await this.retrieveCommitteeMemberByRole(2, id_tesis);
    const sinodales: Comite[] = await this.retrieveCommitteeMemberByRole(3, id_tesis);
    const suplente: Comite[] = await this.retrieveCommitteeMemberByRole(4, id_tesis);
    const tesis: Tesis = await this.tesisService.findOne(id_tesis);

    switch(tesis.alumno.datos_alumno.id_grado_estudio)
    {
      case 1:
        const retrievedCommitteeDTOMasters: RetrievedCommitteeDTO = {
          asesor: asesor && asesor[0] && asesor[0].asesor ? asesor[0].asesor : null,
          coasesor: coasesor && coasesor[0] && coasesor[0].asesor ? coasesor[0].asesor : null,
          sinodal1: sinodales && sinodales[0] && sinodales[0].asesor ? sinodales[0].asesor : null,
          sinodal2: sinodales && sinodales[1] && sinodales[1].asesor ? sinodales[1].asesor : null,
          suplente: suplente && suplente[0] && suplente[0].asesor ? suplente[0].asesor : null,
        };
        return retrievedCommitteeDTOMasters;
        break;
      case 2:
        const retrievedCommitteeDTOPhd: RetrievedCommitteeDTO = {
          asesor: asesor && asesor[0] && asesor[0].asesor ? asesor[0].asesor : null,
          coasesor: coasesor && coasesor[0] && coasesor[0].asesor ? coasesor[0].asesor : null,
          sinodal1: sinodales && sinodales[0] && sinodales[0].asesor ? sinodales[0].asesor : null,
          sinodal2: sinodales && sinodales[1] && sinodales[1].asesor ? sinodales[1].asesor : null,
          sinodal3: sinodales && sinodales[2] && sinodales[2].asesor ? sinodales[2].asesor : null,
          sinodal4: sinodales && sinodales[3] && sinodales[3].asesor ? sinodales[3].asesor : null,
          suplente: suplente && suplente[0] && suplente[0].asesor ? suplente[0].asesor : null,
        }
        return retrievedCommitteeDTOPhd;
        break;
    }

  }

  async retrieveCommitteeMemberByRole(role: number, id_tesis: number)
  {
    // 1: Asesor 2: Co-asesor 3: Sinodal 4: Suplente
    return await this.comiteRepository.find({ where: {
      id_tesis: id_tesis,
      id_funcion: role
    }, relations: ["asesor"]})
  }

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
  async findAsignacionesAsesorados(idPeriodo: number, idAsesor: number) {
    const subquery = this.comiteRepository
      .createQueryBuilder("c")
      .select("c.id_tesis")
      .where("c.id_usuario = :id_usuario", { id_usuario: idAsesor })      

    const resp = await this.asignacionRepository
      .createQueryBuilder("a")
      .select([
        "a.num_avance AS num_avance",
        "a.id_asignacion AS id_asignacion",
        "u.nombre AS nombre",
        "u.apellido_paterno AS apellido_paterno",
        "u.apellido_materno AS apellido_materno",
        "a.titulo AS titulo",
        "a.fecha_entrega AS fecha_entrega",
        "a.calificacion AS calificacion",
        "a.id_acta_evaluacion AS id_acta_evaluacion",
        "a.id_formato_evaluacion AS id_formato_evaluacion",   
        "da.id_grado_estudio AS grado"
      ])
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Usuario, "u", "u.id_usuario = t.id_usuario")
      .innerJoin(DatosAlumno, "da", "da.id_datos_alumno = u.id_datos_alumno")      
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

  async findContacts(idTesis: number) {
    const resp = await this.comiteRepository
      .createQueryBuilder("c")
      .select([
        "u.nombre AS nombre",
        "u.apellido_paterno AS apellido_paterno",
        "u.apellido_materno AS apellido_materno",
        "u.correo AS correo"
      ])
      .innerJoin(Usuario, "u", "u.id_usuario = c.id_usuario")
      .where('c.id_tesis = :id', { id: idTesis })
      .getRawMany();

    return resp;
  }

  //estado activo importa?
  async validateAsesorRole(idAsesor: number, idAlumno: number) {
    const resp = await this.comiteRepository
      .createQueryBuilder("c")
      .select([
        "f.nombre_funcion AS nombre_funcion",
        "t.id_tesis AS id_tesis"
      ])
      .innerJoin(Tesis, "t", "t.id_tesis = c.id_tesis")      
      .innerJoin(Funcion, "f", "f.id_funcion = c.id_funcion") 
      .where('c.id_usuario = :id_asesor', { id_asesor: idAsesor })
      .andWhere('t.id_usuario = :id_alumno', { id_alumno: idAlumno })
      .andWhere('t.estado_finalizacion = false')
      .getRawOne();

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
