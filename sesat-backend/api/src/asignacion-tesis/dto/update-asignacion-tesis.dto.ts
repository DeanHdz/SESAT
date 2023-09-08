import { PartialType } from "@nestjs/mapped-types";
import { CreateAsignacionTesiDto } from "./create-asignacion-tesis.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAsignacionTesiDto extends PartialType(
  CreateAsignacionTesiDto
) {
  @IsNotEmpty()
  @IsNumber()
  id_asignacion_tesis: number;

  @IsNotEmpty()
  @IsNumber()
  id_asignacion: number;

  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;
}
