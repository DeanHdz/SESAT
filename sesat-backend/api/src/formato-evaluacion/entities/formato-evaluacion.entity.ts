import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class FormatoEvaluacion {
  @PrimaryGeneratedColumn()
  id_formato_evaluacion: number;

  @Column()
  id_formato_vacio: number;

  @Column({ type: "bytea" })
  documento_rellenado: any;

  /*@OneToOne(() => FormatosVacios, { eager: true })
  @JoinColumn({ name: "id_formato_vacio" })
  formatos_vacios: FormatosVacios;*/
}
