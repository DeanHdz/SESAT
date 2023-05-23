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

@Entity()
export class Asignacion {
  @PrimaryGeneratedColumn()
  asignacion_id: number;

  @Column()
  id_tesis: number;

  @ManyToOne(() => Tesis, (tesis) => tesis.asignaciones)
  @JoinColumn({name: 'id_tesis'})
  tesis: Tesis;

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
}
