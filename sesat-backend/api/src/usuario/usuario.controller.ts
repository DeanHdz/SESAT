import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, ParseIntPipe, DefaultValuePipe } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { CreateFromExternalDto } from "./dto/create-usuario-external.dto";
import { Put } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { Usuario } from "./entities/usuario.entity";
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateForeignAsesorDto } from "./dto/create-foreign-asesor.dto";
import { CreateExternalAsesorDto } from "./dto/create-external-asesor.dto";

@Controller("usuario")
export class UsuarioController{
  constructor(private readonly usuarioService: UsuarioService) {}
  
  @Get("/status/:id")
  async chageStatus(@Param("id") id: string)
  {
    return await this.usuarioService.changeStatus(+id);
  }

  @Get('/id/:id')
  async getById(@Param("id") id: string)
  {
    return await this.usuarioService.findById(+id);
  }

  @Get('/name/:name')
  async getByName(@Param("name") name: string)
  {
    return await this.usuarioService.findByName(name);
  }

  @Post('/asesor/external')
  async createExternalAsesor(@Body() createExternalAsesorDto: CreateExternalAsesorDto)
  {
    return await this.usuarioService.createExternalAsesor(createExternalAsesorDto);
  }

  @Get('/paginated/asesores')
  async paginateAsesores(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Usuario>> {
    limit = limit > 100 ? 100 : limit;
    return this.usuarioService.paginateAsesores({
      page,
      limit,
      route: '/paginated/asesores',
    });
  }

  @Get("/asesor/id/:id")
  async findAsesoresById(@Param("id") id_usuario: string) {
    return await this.usuarioService.findAsesoresById(+id_usuario);
  }

  @Get("/asesor/name/:name")
  async findAsesoresByName(@Param("name") name: string) {
    return await this.usuarioService.findAsesoresByName(name);
  }
  
  @Get('/external/asesor/:id')
  async getExternalAsesor(@Param("id") id_usuario: string)
  {
    return await this.usuarioService.getExternalAsesor(+id_usuario);
  }

  @Post('/asesor/foreign')
  async createForeignAsesor(@Body() createForeignAsesorDto: CreateForeignAsesorDto)
  {
    return await this.usuarioService.createForeignAsesor(createForeignAsesorDto);
  }
  
  @Post('/external/student')
  async createFromExternalStudent(@Body() createFromExternalDto: CreateFromExternalDto) {
    return await this.usuarioService.createFromExternalStudent(createFromExternalDto);
  }

  @Get('/external/student/:id')
  async getExternalStudent(@Param("id") id_usuario: string)
  {
    return await this.usuarioService.getExternalStudent(+id_usuario);
  }

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

  @Get("/alumnos-maestria")
  async findAlumnosMaestria() {
    return await this.usuarioService.findAlumnosMaestria();
  }

  @Get("/alumnos-maestria/id/:id")
  async findAlumnosMaestriaById(@Param("id") id_usuario: string) {
    return await this.usuarioService.findAlumnosMaestriaById(+id_usuario);
  }

  @Get("/alumnos-maestria/name/:name")
  async findAlumnosMaestriaByName(@Param("name") nombre: string) {
    return await this.usuarioService.findAlumnosMaestriaByName(nombre);
  }

  @Get('/paginated/alumnosPhd')
  async indexPhd(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Usuario>> {
    limit = limit > 100 ? 100 : limit;
    return this.usuarioService.paginatePhdStudents({
      page,
      limit,
      route: '/paginated/alumnosPhd',
    });
  }

  @Get("/alumnos-phd")
  async findAlumnosPhd() {
    return await this.usuarioService.findAlumnosPhd();
  }

  @Get("/alumnos-phd/id/:id")
  async findAlumnosPhdById(@Param("id") id_usuario: string) {
    return await this.usuarioService.findAlumnosPhdById(+id_usuario);
  }

  @Get("/alumnos-phd/name/:name")
  async findAlumnosPhdByName(@Param("name") nombre: string) {
    return await this.usuarioService.findAlumnosPhdByName(nombre);
  }

  @Get("alumnos-asesorados/:idAsesor/:idGrado")
  async findAlumnosAsesorados(@Param("idAsesor") idAsesor: string, @Param("idGrado") idGrado: string) {
    return await this.usuarioService.findAlumnosAsesorados(+idAsesor, +idGrado);
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
