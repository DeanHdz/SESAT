import { Injectable } from "@nestjs/common";
import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Rol } from "./entities/rol.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>
  ) {}

  create(createRolDto: CreateRolDto) {
    return this.rolRepository.save(createRolDto);
  }

  findAll() {
    return this.rolRepository.find();
  }

  findOne(id: number) {
    return this.rolRepository.findOne({ where: { id_rol: id } });
  }

  update(updateRolDto: UpdateRolDto) {
    return this.rolRepository.save(updateRolDto);
  }

  remove(id: number) {
    return this.rolRepository.delete(id);
  }
}
