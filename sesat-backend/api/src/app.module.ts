import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Usuario } from "./usuario/entities/usuario.entity";
import { UsuarioModule } from "./usuario/usuario.module";
import { AlumnoModule } from "./alumno/alumno.module";
import { TesisModule } from "./tesis/tesis.module";
import { ProgramaModule } from "./programa/programa.module";
import { AsesorModule } from "./asesor/asesor.module";
import { AsesorExternoModule } from "./asesor-externo/asesor-externo.module";
import { CoAsesorModule } from "./co-asesor/co-asesor.module";
import { AsignacionModule } from "./asignacion/asignacion.module";
import { join } from "path";
import { Alumno } from "./alumno/entities/alumno.entity";
import { Asesor } from "./asesor/entities/asesor.entity";
import { AsesorExterno } from "./asesor-externo/entities/asesor-externo.entity";
import { Asignacion } from "./asignacion/entities/asignacion.entity";
import { CoAsesor } from "./co-asesor/entities/co-asesor.entity";
import { Programa } from "./programa/entities/programa.entity";
import { Tesis } from "./tesis/entities/tesis.entity";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, "..", "public"),
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModule => ({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "pc2sesat",
        database: "SESAT",
        schema: "public",
        entities: [
          Alumno,
          Asesor,
          AsesorExterno,
          Asignacion,
          CoAsesor,
          Programa,
          Tesis,
          Usuario,
        ],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuarioModule,
    AlumnoModule,
    TesisModule,
    ProgramaModule,
    AsesorModule,
    AsesorExternoModule,
    CoAsesorModule,
    AsignacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
