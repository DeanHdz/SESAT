import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAsesorDto {
  @IsNotEmpty()
  @IsNumber()
  Clave: number;

  @IsNotEmpty()
  @IsNumber()
  Sinodal: number;
}
