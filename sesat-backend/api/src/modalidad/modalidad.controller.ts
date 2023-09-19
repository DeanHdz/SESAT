import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModalidadService } from './modalidad.service';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';

@Controller('modalidad')
export class ModalidadController {
  constructor(private readonly modalidadService: ModalidadService) {}

  @Post()
  create(@Body() createModalidadDto: CreateModalidadDto) {
    return this.modalidadService.create(createModalidadDto);
  }

  @Get()
  findAll() {
    return this.modalidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modalidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModalidadDto: UpdateModalidadDto) {
    return this.modalidadService.update(+id, updateModalidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modalidadService.remove(+id);
  }
}
