import { Module } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioController } from "./usuario.controller";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { Usuario } from "./entities/usuario.entity";
import { HttpModule } from "@nestjs/axios";
import { DatosAlumnoModule } from "src/datos-alumno/datos-alumno.module";
import { ProgramaModule } from "src/programa/programa.module";
import { GradoEstudioModule } from "src/grado-estudio/grado-estudio.module";
import { TesisModule } from "src/tesis/tesis.module";
import { AsignacionModule } from "src/asignacion/asignacion.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    HttpModule,
    DatosAlumnoModule,
    ProgramaModule,
    GradoEstudioModule,
    TesisModule,
    AsignacionModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
