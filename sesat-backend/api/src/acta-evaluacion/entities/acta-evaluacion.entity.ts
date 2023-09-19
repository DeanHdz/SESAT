import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ActaEvaluacion {
  @PrimaryGeneratedColumn()
  id_acta_evaluacion: number;

  @Column()
  id_acta_vacia: number;

  @Column({ type: "bytea" })
  documento_rellenado: any;

  /*@OneToOne(() => FormatosVacios, { eager: true })
  @JoinColumn({ name: "id_acta_vacia" })
  formatosVacios: FormatosVacios;*/
}
