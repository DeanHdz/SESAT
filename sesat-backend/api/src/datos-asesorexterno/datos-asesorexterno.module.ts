import { Module } from "@nestjs/common";
import { DatosAsesorexternoService } from "./datos-asesorexterno.service";
import { DatosAsesorexternoController } from "./datos-asesorexterno.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatosAsesorexterno } from "./entities/datos-asesorexterno.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DatosAsesorexterno])],
  controllers: [DatosAsesorexternoController],
  providers: [DatosAsesorexternoService],
  exports: [DatosAsesorexternoService],
})
export class DatosAsesorexternoModule {}
