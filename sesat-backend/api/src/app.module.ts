import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AlumnoModule } from './alumno/alumno.module';
import { TesisModule } from './tesis/tesis.module';
import { ProgramaModule } from './programa/programa.module';
import { AsesorModule } from './asesor/asesor.module';
import { AsesorExternoModule } from './asesor-externo/asesor-externo.module';
import { CoAsesorModule } from './co-asesor/co-asesor.module';
import { AsignacionModule } from './asignacion/asignacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'test',
      entities: [Usuario],
      synchronize: true,
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
