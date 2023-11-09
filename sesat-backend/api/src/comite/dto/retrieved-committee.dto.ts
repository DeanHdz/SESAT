import { IsNotEmpty, IsOptional, } from "class-validator";
import { Usuario } from "src/usuario/entities/usuario.entity";
export class RetrievedCommitteeDTO 
{
  @IsOptional()
  asesor: Usuario

  @IsOptional()
  coasesor?: Usuario

  @IsOptional()
  sinodal1: Usuario

  @IsOptional()
  sinodal2: Usuario

  @IsOptional()
  sinodal3?: Usuario

  @IsOptional()
  sinodal4?: Usuario

  @IsOptional()
  suplente: Usuario
}