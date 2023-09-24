import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  DefaultValuePipe
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Put } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { Usuario } from "./entities/usuario.entity";
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller("usuario")
export class UsuarioController{
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/paginated/alumnosMasters')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Usuario>> {
    limit = limit > 100 ? 100 : limit;
    return this.usuarioService.paginateMasterStudents({
      page,
      limit,
      route: '/paginated/alumnosMasters',
    });
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Get("/asesores")
  findAsesores() {
    return this.usuarioService.findAsesores();
  }

  //@UseGuards(JwtAuthGuard)
  @Get("/alumnos")
  findAlumnos() {
    return this.usuarioService.findAlumnos();
  }

  @Get("/alumnos-maestria")
  async findAlumno() {
    return await this.usuarioService.findAlumnosMaestria();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id_usuario: string) {
    return this.usuarioService.findOne(+id_usuario);
  }

  //@UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(updateUsuarioDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id_usuario: string) {
    return this.usuarioService.remove(+id_usuario);
  }
}
