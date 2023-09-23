import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Put } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("usuario")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

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
