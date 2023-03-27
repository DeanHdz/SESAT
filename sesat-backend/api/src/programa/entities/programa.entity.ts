import {PrimaryColumn, Column} from "typeorm";

export class Programa {
  @PrimaryColumn()
  id_programa: number;

  @Column()
  NombrePrograma: string;
}
