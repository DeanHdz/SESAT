import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Programa {
  @PrimaryColumn()
  id_programa: number;

  @Column()
  NombrePrograma: string;
}
