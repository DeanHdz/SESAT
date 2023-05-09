import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';

@Controller('respuesta')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestaService) {}

  @Post()
  create(@Body() createRespuestaDto: CreateRespuestaDto) {
    return this.respuestaService.create(createRespuestaDto);
  }

  @Get()
  findAll() {
    return this.respuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respuestaService.findOne(+id);
  }

  @Put()
  update(@Body() updateRespuestaDto: UpdateRespuestaDto) {
    return this.respuestaService.update(updateRespuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaService.remove(+id);
  }
}
