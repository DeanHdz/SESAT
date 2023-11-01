import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe, 
  DefaultValuePipe
} from "@nestjs/common";
import { TesisService } from "./tesis.service";
import { CreateTesisDto } from "./dto/create-tesis.dto";
import { UpdateTesisDto } from "./dto/update-tesis.dto";

@Controller("tesis")
export class TesisController {
  constructor(private readonly tesisService: TesisService) {}

  @Get('/paginated/phd')
  async paginatedCompletedPhd(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  )
  {
    limit = limit > 100 ? 100 : limit;
    return this.tesisService.paginatedCompletedPhd(page, limit);
  }
  
  @Get("/phd/name/:name")
  async findCompletedPhdByName(@Param("name") name: string) {
    return await this.tesisService.findCompletedPhdByName(name);
  }
  
  @Get('/paginated/md/half-time')
  async paginatedCompletedMdHalfTime(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  )
  {
    limit = limit > 100 ? 100 : limit;
    return this.tesisService.paginatedCompletedMdHalfTime(page, limit);
  }

  @Get("/md/half-time/name/:name")
  async findCompletedMdHalfTimeByName(@Param("name") name: string) {
    return await this.tesisService.findCompletedMdHalfTimeByName(name);
  }

  @Get('/paginated/md/full-time')
  async paginatedCompletedMdFullTime(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  )
  {
    limit = limit > 100 ? 100 : limit;
    return this.tesisService.paginatedCompletedMdFullTime(page, limit);
  }

  @Get("/md/full-time/name/:name")
  async findCompletedMdFullTimeByName(@Param("name") name: string) {
    return await this.tesisService.findCompletedMdFullTimeByName(name);
  }

  @Post()
  create(@Body() createTesisDto: CreateTesisDto) {
    return this.tesisService.create(createTesisDto);
  }

  @Get()
  findAll() {
    return this.tesisService.findAll();
  }

  @Get("/completed/mdegree/half-time")
  findCompletedMDegreeHalfTime() {
    return this.tesisService.findCompletedMDegreeHalfTime();
  }

  @Get("/completed/mdegree/full-time")
  findCompletedMDegreeFullTime() {
    return this.tesisService.findCompletedMDegreeFullTime();
  }

  @Get("/completed/phd")
  findInactivePhd() {
    return this.tesisService.findCompletedPhd();
  }

  @Get("/basic-info/:id")
  findOneBasicInfo(@Param("id") id: string) {
    return this.tesisService.findOneBasicInfo(+id);
  }  

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tesisService.findOne(+id);
  }

  @Get("/per-student/:id")
  findTesisPerStudent(@Param("id") id_usuario: string) {
    return this.tesisService.findTesisPerStudent(+id_usuario);
  }
  /**Encuentra cuantos alumnos de doctorado activos hay para X numero de avance */
  @Get("/students-count/phd/:numAv")
  findStudentsGroupCount(@Param("numAv") numAv: string) {
    return this.tesisService.findStudentsCountByNumAv(+numAv);
  }

  /**Encuentra cuantos alumnos de maestria activos hay para X numero de avance */
  @Get("/students-count/md/:numAv/:modalidad")
  findMDStudentsGroupCount(@Param("numAv") numAv: string, @Param("modalidad") modalidad: string) {
    return this.tesisService.findMDStudentsCountByNumAv(+numAv, +modalidad);
  }

  /**Encuentra cuantos alumnos de maestria medio tiempo activos hay agrupados por numero de avance */
  @Get("/tesis-status/masters/mid-time")
  findTesisStatusMastersMidTime() {
    return this.tesisService.findTesisStatusMastersMidTime();
  }

  /**Encuentra cuantos alumnos de maestria tiempo completo activos hay agrupados por numero de avance */
  @Get("/tesis-status/masters/full-time")
  findTesisStatusMastersFullTime() {
    return this.tesisService.findTesisStatusMastersFullTime();
  }

  /**Historial de avances por Tesis */
  @Get("/history/:idTesis")
  findHistory(@Param("idTesis") idTesis: string,) {
    return this.tesisService.findTesisHistory(+idTesis);
  }

  /**Historial completo de tesis para un alumno, debe corresponder al */
  @Get("/full-history/:idAlumno")
  findFullHistory(@Param("idAlumno") idAlumno: string) {
    return this.tesisService.findFullHistory(+idAlumno);
  }

  @Put()
  update(@Body() updateTesisDto: UpdateTesisDto) {
    return this.tesisService.update(updateTesisDto);
  }

  /**Todos los alumnos que cuya asignacion cumpla con:
   * Estatus entregada = 1
   * num_avance === ultimo_avance
   * estado_finalizacion = false
   * Se actualiza numero de avance(semestre) al crear un periodo
   */
  @Put("update-num_avance/all/:id_periodo")
  updateNumAvance(@Param("id_periodo") id_periodo: string) {
    return this.tesisService.updateNumAvanceForEvaluatedStudents(+id_periodo);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tesisService.remove(+id);
  }
}
