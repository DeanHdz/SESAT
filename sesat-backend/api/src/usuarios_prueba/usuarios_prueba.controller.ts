import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuariosPruebaService } from './usuarios_prueba.service';
import { CreateUsuariosPruebaDto } from './dto/create-usuarios_prueba.dto';
import { UpdateUsuariosPruebaDto } from './dto/update-usuarios_prueba.dto';

@Controller('usuarios-prueba')
export class UsuariosPruebaController {
  constructor(private readonly usuariosPruebaService: UsuariosPruebaService) {}

  @Post()
  create(@Body() createUsuariosPruebaDto: CreateUsuariosPruebaDto) {
    return this.usuariosPruebaService.create(createUsuariosPruebaDto);
  }

  @Get()
  findAll() {
    return this.usuariosPruebaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosPruebaService.findOne(+id);
  }

  @Put()
  update(@Param('id') id: string, @Body() updateUsuariosPruebaDto: UpdateUsuariosPruebaDto) {
    return this.usuariosPruebaService.update(+id, updateUsuariosPruebaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosPruebaService.remove(+id);
  }
}
