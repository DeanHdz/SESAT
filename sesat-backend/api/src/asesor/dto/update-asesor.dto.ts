import { PartialType } from "@nestjs/mapped-types";
import { CreateAsesorDto } from "./create-asesor.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAsesorDto extends PartialType(CreateAsesorDto) {
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
