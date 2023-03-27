import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AsesorExternoService } from './asesor-externo.service';
import { CreateAsesorExternoDto } from './dto/create-asesor-externo.dto';
import { UpdateAsesorExternoDto } from './dto/update-asesor-externo.dto';

@Controller('asesor-externo')
export class AsesorExternoController {
  constructor(private readonly asesorExternoService: AsesorExternoService) {}

  @Post()
  create(@Body() createAsesorExternoDto: CreateAsesorExternoDto) {
    return this.asesorExternoService.create(createAsesorExternoDto);
  }

  @Get()
  findAll() {
    return this.asesorExternoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asesorExternoService.findOne(+id);
  }

  @Put()
  update(@Body() updateAsesorExternoDto: UpdateAsesorExternoDto) {
    return this.asesorExternoService.update(updateAsesorExternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asesorExternoService.remove(+id);
  }
}
