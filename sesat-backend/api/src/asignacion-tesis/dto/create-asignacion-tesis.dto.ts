import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAsignacionTesiDto {
  @IsNotEmpty()
  @IsNumber()
  id_asignacion: number;

  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;
}
