import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) { }

  @Get()
  findAll() {
    return this.asignacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionService.findOne(+id);
  }

  //Para tablero de asignaciones de doctorado
  @Get('groups-status/phd')
  findStudentStatusPHD() {
    return this.asignacionService.findStatusPHD();
  }

  //Para tablero de asignaciones de maestria
  @Get('groups-status/md')
  findStudentStatusMD() {
    return this.asignacionService.findStatusMastersDegree();
  }

  //Obtener una asignacion X (no importa) de un grupo en especifico
  //para ver/actualizar campos
  @Get('phd/one-in-group/:numAv/:tipo/:id')
  findOneByNumAvANDTipo(@Param('numAv') numAv: string, @Param('tipo') tipo: string, @Param('id') id: string) {
    return this.asignacionService.findOneByNumAvANDTipo(+numAv, +tipo, +id);
  }

  //Devuelve el PDF de la tesis terminada
  @Get('/final-document/:id')
  findDocumentByID(@Param('id') id: string) {
    return this.asignacionService.findDocumentByID(+id);
  }

  /**Devuelve El NUMERO de asignaciones pendientes para determinado num_avance de alumnos de doctorado*/
  @Get('num-pendientes/phd/:numAvance/:tipo')
  findNumAsignacionesPendientesPhd(@Param('numAvance') numAvance: string, @Param('tipo') tipo: string) {
    return this.asignacionService.findNumAsignacionesPendientesPhd(+numAvance, +tipo);
  }

  /**Devuelve El NUMERO de asignaciones pendientes para determinado num_avance de alumnos de maestria de medio tiempo*/
  @Get('num-pendientes/masters/mid-time/:numAvance')
  findNumAsignacionesPendientesMdMidTime(@Param('numAvance') numAvance: string) {
    return this.asignacionService.findNumAsignacionesPendientesMdMidTime(+numAvance);
  }

  /**Devuelve El NUMERO de asignaciones pendientes para determinado num_avance de alumnos de maestria de tiempo completo*/
  @Get('num-pendientes/masters/full-time/:numAvance')
  findNumAsignacionesPendientesMdFullTime(@Param('numAvance') numAvance: string) {
    return this.asignacionService.findNumAsignacionesPendientesMdFullTime(+numAvance);
  }

  /**Devuelve El NUMERO de asignaciones entregadas para determinado num_avance de alumnos de doctorado*/
  @Get('num-entregadas/phd/:numAvance/:tipo')
  findNumAsignacionesEntregadasPhd(@Param('numAvance') numAvance: string, @Param('tipo') tipo: string) {
    return this.asignacionService.findNumAsignacionesEntregadasPhd(+numAvance, +tipo);
  }


  /**Devuelve El NUMERO de asignaciones entregadas para determinado num_avance de alumnos de maestria*/
  @Get('num-entregadas/md/:numAvance/:mod')
  findNumAsignacionesEntregadasMD(@Param('numAvance') numAvance: string, @Param('mod') mod: string) {
    return this.asignacionService.findNumAsignacionesEntregadasMD(+numAvance, +mod);
  }


  @Post()
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.create(createAsignacionDto);
  }

  @Post('pendientes/phd/:numAv')
  createPHDGroup(@Param('numAv') numAv: string, @Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.createGroupByNumaAvance(+numAv, createAsignacionDto);
  }

  @Post('pendientes/md/:numAv')
  createMastersGroup(@Param('numAv') numAv: string, @Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.createMastersGroupByNumaAvance(+numAv, createAsignacionDto);
  }

  //Actualizar grupo de asignaciones
  @Put('phd/update_group/')
  updateAssignmentGroup(@Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.updatePhdGroup(updateAsignacionDto);
  }



  /*DELETE this please
  
  @Get('phd/update-group/:numAv/:tipo/:id_periodo')
  updateGroup(@Param('numAv') numAv: string, @Param('tipo') tipo: string, @Param('id_periodo') idPeriodo: string, ) {
    return this.asignacionService.findArrayAsignacionesActivasPhd(+numAv,+tipo,+idPeriodo);
  }*/


  @Put()
  update(@Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.update(updateAsignacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionService.remove(+id);
  }
}
