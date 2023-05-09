import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  Timestamp,
} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import path from "path";

@Entity()
export class Asignacion {
  @PrimaryColumn()
  id_asignacion: number;

  @Column()
  id_tesis: number;

  //@OneToMany(() => Tesis, (tesis) => tesis.id_tesis, { eager: true })
  //@JoinColumn({name: 'id_tesis'})
  //tesis: Tesis[];

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
