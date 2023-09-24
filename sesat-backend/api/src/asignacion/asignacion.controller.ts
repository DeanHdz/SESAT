import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @Post()
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.create(createAsignacionDto);
  }

  @Get()
  findAll() {
    return this.asignacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionService.findOne(+id);
  }

  //Devuelve el PDF de la tesis terminada
  @Get('/final-document/:id')
  findDocumentByID(@Param('id') id: string) {
    return this.asignacionService.findDocumentByID(+id);
  }

  /**Devuelve El ARRAY de asignaciones pendientes [id_tesis] para determinado num_avance
  @Get('pendientes/phd/:numAvance')
  findAsignacionesPendientesPhd(@Param('numAvance') numAvance: string) {
    return this.asignacionService.findAsignacionesPendientesPhd(+numAvance);
  }  */
  /**Devuelve El NUMERO de asignaciones pendientes para determinado num_avance de alumnos de doctorado*/
  @Get('num-pendientes/phd/:numAvance')
  findNumAsignacionesPendientesPhd(@Param('numAvance') numAvance: string) {
    return this.asignacionService.findNumAsignacionesPendientesPhd(+numAvance);
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






  @Put()
  update(@Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.update(updateAsignacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionService.remove(+id);
  }
}
