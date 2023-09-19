import { Module } from "@nestjs/common";
import { DatosAsesorexternoService } from "./datos-asesor-externo.service";
import { DatosAsesorexternoController } from "./datos-asesor-externo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatosAsesorExterno } from "./entities/datos-asesor-externo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DatosAsesorExterno])],
  controllers: [DatosAsesorexternoController],
  providers: [DatosAsesorexternoService],
  exports: [DatosAsesorexternoService],
})
export class DatosAsesorexternoModule {}
