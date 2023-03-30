import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentarioService.create(createComentarioDto);
  }

  @Get()
  findAll() {
    return this.comentarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
    return this.comentarioService.update(+id, updateComentarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentarioService.remove(+id);
  }
}
