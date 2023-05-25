import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  Timestamp,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import path from "path";
import { AsignacionTesis } from "src/asignacion-tesis/entities/asignacion-tesis.entity";

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

  @Column()
  id_acta_evaluacion: number;

  @OneToMany(
    () => AsignacionTesis,
    (asignacion_tesis) => asignacion_tesis.asignacion,
    { eager: true }
  )
  asignacion_tesis: AsignacionTesis[];
}
