import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { ComiteService } from "./comite.service";
import { CreateComiteDto } from "./dto/create-comite.dto";
import { UpdateComiteDto } from "./dto/update-comite.dto";

@Controller("comite")
export class ComiteController {
  constructor(private readonly comiteService: ComiteService) {}

  @Post()
  create(@Body() CreateComiteDto: CreateComiteDto) {
    return this.comiteService.create(CreateComiteDto);
  }

  @Get()
  findAll() {
    return this.comiteService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.comiteService.findOne(+id);
  }

  @Get("/findasesor-by-id-tesis/:id")
  findAsesorByIDTesis(@Param("id") id: string) {
    return this.comiteService.findAsesorByIDTesis(+id);
  }

  @Get("/per-asesor/:id")
  findPerAsesor(@Param("id") id: string) {
    return this.comiteService.findPerAsesor(+id);
  }

  @Get("/per-tesis/:id")
  findPerTesis(@Param("id") id: string) {
    return this.comiteService.findPerTesis(+id);
  }

    /*##########################ASESOR#####################################################*/
  @Get('asesor/turned-in/:idPeriodo/:idAsesor/:idFuncion')
  findAsignacionesEntregadas(@Param('idPeriodo') idPeriodo: string, @Param('idAsesor') idAsesor: string, @Param('idFuncion') idFuncion: string) {
    return this.comiteService.findAsignacionesAsesorados(+idPeriodo, +idAsesor, +idFuncion);
  }

  @Get('members/:idTesis')
  findMembers(@Param('idTesis') idTesis: string) {
    return this.comiteService.findMembers(+idTesis);
  }

  @Get('validate-role/:idAsesor/:idAlumno')
  validateAsesorRole(@Param('idAsesor') idAsesor: string, @Param('idAlumno') idAlumno: string) {
    return this.comiteService.validateAsesorRole(+idAsesor, +idAlumno);
  }

  @Put()
  update(@Body() updateComiteDto: UpdateComiteDto) {
    return this.comiteService.update(updateComiteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.comiteService.remove(+id);
  }
}
