import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class PasswordChangeDTO {
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}