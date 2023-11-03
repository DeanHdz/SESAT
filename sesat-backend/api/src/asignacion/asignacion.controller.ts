import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { FilledActDto } from 'src/acta-evaluacion/dto/create-formulario.dto';

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

  @Get('one-to-review/:idAsesor/:idAsignacion')
  findOneToReview(@Param('idAsesor') idAsesor: string, @Param('idAsignacion') idAsignacion: string) {
    return this.asignacionService.findOneToReview(+idAsesor, +idAsignacion);
  }

  //Para tablero de asignaciones de doctorado
  @Get('groups-status/phd/:idPeriodo')
  findStudentStatusPHD(@Param('idPeriodo') idPeriodo: string) {
    return this.asignacionService.findStatusPHD(+idPeriodo);
  }

  //Para tablero de asignaciones de maestria
  @Get('groups-status/md/:idPeriodo')
  findStudentStatusMD(@Param('idPeriodo') idPeriodo: string) {
    return this.asignacionService.findStatusMastersDegree(+idPeriodo);
  }

  //Obtener una asignacion X (no importa) de un grupo en especifico
  //para ver/actualizar campos
  @Get('phd/one-in-group/:idPeriodo/:numAv/:tipo')
  findOneByNumAvANDTipoPHD(@Param('idPeriodo') idPeriodo: string, @Param('numAv') numAv: string, @Param('tipo') tipo: string) {
    return this.asignacionService.findOneInGroupPHD(+idPeriodo, +numAv, +tipo);
  }

  //Obtener una asignacion X (no importa) de un grupo en especifico
  //para ver/actualizar campos
  @Get('md/one-in-group/:idPeriodo/:numAv/:mod')
  findOneByNumAvANDModalidadMD(@Param('idPeriodo') idPeriodo: string, @Param('numAv') numAv: string, @Param('mod') mod: string) {
    return this.asignacionService.findOneInGroupMD(+idPeriodo, +numAv, +mod);
  }

  //Devuelve el PDF de la tesis terminada
  @Get('/final-document/:id')
  findDocumentByID(@Param('id') id: string) {
    return this.asignacionService.findDocumentByID(+id);
  }

  /**Devuelve El NUMERO de asignaciones pendientes para determinado num_avance de alumnos de doctorado*/
  @Get('num-pendientes/phd/:idPeriodo/:numAvance/:tipo')
  findNumAsignacionesPendientesPhd(@Param('idPeriodo') idPeriodo: string, @Param('numAvance') numAvance: string, @Param('tipo') tipo: string) {
    return this.asignacionService.findNumAsignacionesPendientesPhd(+idPeriodo, +numAvance, +tipo);
  }

  /**Devuelve El NUMERO de asignaciones pendientes para determinado num_avance de alumnos de maestria */
  @Get('num-pendientes/masters/:idPeriodo/:numAvance/:idModalidad')
  findNumAsignacionesPendientesMdMidTime(@Param('idPeriodo') idPeriodo: string, @Param('numAvance') numAvance: string, @Param('idModalidad') idModalidad: string) {
    return this.asignacionService.findNumAsignacionesPendientesMastersDegree(+idPeriodo, +numAvance, +idModalidad);
  }


  /**Devuelve El NUMERO de asignaciones entregadas para determinado num_avance de alumnos de doctorado*/
  @Get('num-entregadas/phd/:idPeriodo/:numAvance/:tipo')
  findNumAsignacionesEntregadasPhd(@Param('idPeriodo') idPeriodo: string, @Param('numAvance') numAvance: string, @Param('tipo') tipo: string) {
    return this.asignacionService.findNumAsignacionesEntregadasPhd(+idPeriodo, +numAvance, +tipo);
  }


  /**Devuelve El NUMERO de asignaciones entregadas para determinado num_avance de alumnos de maestria*/
  @Get('num-entregadas/md/:idPeriodo/:numAvance/:mod')
  findNumAsignacionesEntregadasMD(@Param('idPeriodo') idPeriodo: string, @Param('numAvance') numAvance: string, @Param('mod') mod: string) {
    return this.asignacionService.findNumAsignacionesEntregadasMD(+idPeriodo, +numAvance, +mod);
  }

  //
  @Get('alumno/:idPeriodo/:idAlumno')
  findAsignacionesByPeriodAndAlumno(@Param('idPeriodo') idPeriodo: string, @Param('idAlumno') idAlumno: string) {
    return this.asignacionService.findAsignacionesByPeriodAndAlumno(+idPeriodo, +idAlumno);
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
  updateAssignmentGroupPHD(@Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.updatePhdGroup(updateAsignacionDto);
  }

  //Actualizar grupo de asignaciones
  @Put('md/update_group/')
  updateAssignmentGroupMD(@Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.updateMDGroup(updateAsignacionDto);
  }  

  @Put()
  update(@Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.update(updateAsignacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionService.remove(+id);
  }
}
