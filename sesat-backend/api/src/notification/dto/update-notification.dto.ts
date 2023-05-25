import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificacionDto } from "./create-notification.dto";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class UpdateNotificacionDto extends PartialType(CreateNotificacionDto) {
  @IsNotEmpty()
  @IsNumber()
  id_notificacion: number;

  @IsNotEmpty()
  @IsNumber()
  clave_usuario: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  decripcion: string;

  @IsNotEmpty()
  @IsDate()
  fecha_expedicion: Date;
}
