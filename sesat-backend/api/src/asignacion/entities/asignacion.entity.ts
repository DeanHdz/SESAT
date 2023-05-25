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
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import path from "path";
import { AsignacionTesis } from "src/asignacion-tesis/entities/asignacion-tesis.entity";
import { Comentario } from "src/comentario/entities/comentario.entity";
import { ActaEvaluacion } from "src/acta-evaluacion/entities/acta-evaluacion.entity";
import { FormatoEvaluacion } from "src/formato-evaluacion/entities/formato-evaluacion.entity";

@Entity()
export class Asignacion {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column()
  num_avance: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  apertura: Date;

  @Column()
  cierre: Date;

  @Column()
  calificacion: number;

  @Column()
  documento: string;

  @Column()
  estado_entrega: number;

  @Column()
  retroalimentacion: string;

  @Column()
  id_formato_evaluacion: number;

  @OneToOne(() => FormatoEvaluacion, { eager: true })
  @JoinColumn({ name: "id_formato_evaluacion" })
  formatoEvaluacion: FormatoEvaluacion;

  @Column()
  id_acta_evaluacion: number;

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
  comentarios: Comentario[];
}
