import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { FormatoVacio } from "src/formato-vacio/entities/formato-vacio.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActaEvaluacion {
  @PrimaryGeneratedColumn()
  id_acta_evaluacion: number;

  @Column({ type: "bytea" })
  documento_rellenado;

  @Column()
  id_acta_vacia: number;

  @OneToOne(() => FormatoVacio, { eager: true })
  @JoinColumn({ name: "id_acta_vacia" })
  formatosVacios: FormatoVacio;
}
