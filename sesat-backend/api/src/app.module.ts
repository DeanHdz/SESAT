import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsuarioModule } from "./usuario/usuario.module";
import { TesisModule } from "./tesis/tesis.module";
import { ProgramaModule } from "./programa/programa.module";
import { AsignacionModule } from "./asignacion/asignacion.module";
import { ActaEvaluacionModule } from "./acta-evaluacion/acta-evaluacion.module";
import { FormatosVaciosModule } from "./formatos-vacios/formatos-vacios.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { RespuestaModule } from "./respuesta/respuesta.module";
import { ComentarioModule } from "./comentario/comentario.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { NotificationModule } from "./notification/notification.module";
import { UsuariosPruebaModule } from "./usuarios_prueba/usuarios_prueba.module";
import { AsignacionTesisModule } from "./asignacion-tesis/asignacion-tesis.module";
import { ComiteModule } from "./comite/comite.module";
import { DatosAlumnoModule } from "./datos-alumno/datos-alumno.module";
import { RolModule } from "./rol/rol.module";
import { FuncionModule } from "./funcion/funcion.module";
import { FormatoEvaluacionModule } from "./formato-evaluacion/formato-evaluacion.module";
import { DatosAsesorexternoModule } from "./datos-asesorexterno/datos-asesorexterno.module";
import { VariablesSistemaModule } from "./variables-sistema/variables-sistema.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, "..", "public"),
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModule => ({
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        schema: process.env.DB_SCHEMA,
        synchronize: false,
        entities: ["dist/**/entities/*.entity.js"],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuarioModule,
    TesisModule,
    ProgramaModule,
    AsignacionModule,
    ActaEvaluacionModule,
    FormatosVaciosModule,
    RespuestaModule,
    ComentarioModule,
    AuthModule,
    NotificationModule,
    UsuariosPruebaModule,
    AsignacionTesisModule,
    ComiteModule,
    DatosAlumnoModule,
    RolModule,
    FuncionModule,
    FormatoEvaluacionModule,
    DatosAsesorexternoModule,
    VariablesSistemaModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
