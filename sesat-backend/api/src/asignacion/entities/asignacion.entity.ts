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
import { Comentario } from "src/comentario/entities/comentario.entity";
import { ActaEvaluacion } from "src/acta-evaluacion/entities/acta-evaluacion.entity";
import { FormatoEvaluacion } from "src/formato-evaluacion/entities/formato-evaluacion.entity";
import { Modalidad } from "src/modalidad/entities/modalidad.entity";
import { Periodo } from "src/periodo/entities/periodo.entity";

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
  id_periodo: number;

  @OneToOne(() => Periodo, { eager: false })
  @JoinColumn({ name: "id_periodo" })
  periodo: Periodo;

  @Column()
  num_avance: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha_entrega: string;

  @Column()
  calificacion: number;

  @Column({ type: "bytea" })
  documento: any;

  @Column()
  estado_entrega: number;

  @Column()
  retroalimentacion: string;

  @Column()
  tipo: number;

  @Column()
  fecha_presentacion: string;

  // @OneToOne(() => FormatoEvaluacion, { eager: true })
  // @JoinColumn({ name: "id_formato_evaluacion" })
  // formatoEvaluacion: FormatoEvaluacion;

  // @OneToOne(() => ActaEvaluacion, { eager: true })
  // @JoinColumn({ name: "id_acta_evaluacion" })
  // actaEvaluacion: ActaEvaluacion;

  @ManyToOne(() => Tesis, (tesis) => tesis.asignaciones)
  @JoinColumn({ name: "id_tesis" })
  tesis: Tesis;

  //@OneToMany(() => Comentario, (comentario) => comentario.asignacion)
  //comentarios: Comentario[];

  // @OneToOne(() => Modalidad, { eager: true })
  // @JoinColumn({ name: "id_modalidad" })
  // modalidad: Modalidad;
}
