import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FuncionService } from './funcion.service';
import { CreateFuncionDto } from './dto/create-funcion.dto';
import { UpdateFuncionDto } from './dto/update-funcion.dto';

@Controller('funcion')
export class FuncionController {
  constructor(private readonly funcionService: FuncionService) {}

  @Post()
  create(@Body() createFuncionDto: CreateFuncionDto) {
    return this.funcionService.create(createFuncionDto);
  }

  @Get()
  findAll() {
    return this.funcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionService.findOne(+id);
  }

  @Put()
  update(@Body() updateFuncionDto: UpdateFuncionDto) {
    return this.funcionService.update(updateFuncionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionService.remove(+id);
  }
}