import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FormatoVacio {
  @PrimaryColumn()
  id_formato_vacio: number;

  @Column({ type: "bytea" })
  acta_evaluacion: any;

  @Column({ type: "bytea" })
  formato_evaluacion: any;
}
