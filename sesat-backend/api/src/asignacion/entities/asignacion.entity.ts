import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  Timestamp,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";

@Entity()
export class Asignacion {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column()
  id_formato_evaluacion: number;

  @Column()
  id_acta_evaluacion: number;

  @Column()
  id_tesis: number;

  @Column()
  id_modalidad: number;

  @Column()
  num_avance: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha_apertura: Date;

  @Column()
  fecha_cierre: Date;

  @Column()
  calificacion: number;

  @Column({ type: "bytea" })
  documento: any;

  @Column()
  estado_entrega: number;

  @Column()
  retroalimentacion: string;

  /*@OneToOne(() => FormatoEvaluacion, { eager: true })
  @JoinColumn({ name: "id_formato_evaluacion" })
  formatoEvaluacion: FormatoEvaluacion;

  @OneToOne(() => ActaEvaluacion, { eager: true })
  @JoinColumn({ name: "id_acta_evaluacion" })
  actaEvaluacion: ActaEvaluacion;

  @OneToMany(
    () => AsignacionTesis,
    (asignacion_tesis) => asignacion_tesis.asignacion,
    { eager: true }
  )
  asignaciones_tesis: AsignacionTesis[];

  @OneToMany(() => Comentario, (comentario) => comentario.asignacion)
  comentarios: Comentario[];*/
}
