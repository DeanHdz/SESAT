import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAsesorDto {
  @IsNotEmpty()
  @IsNumber()
  asesor_id: number;

  @IsNotEmpty()
  @IsNumber()
  clave: number;

  @IsNotEmpty()
  @IsNumber()
  sinodal: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;
}
