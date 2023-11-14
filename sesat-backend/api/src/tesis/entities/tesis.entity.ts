import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Programa } from "src/programa/entities/programa.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Comite } from "src/comite/entities/comite.entity";

@Entity()
export class Tesis {
  @PrimaryGeneratedColumn()
  id_tesis: number;

  @Column()
  id_usuario: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: "id_usuario" })
  alumno: Usuario;

  @Column()
  titulo: string;

  @Column()
  fecha_registro: Date;

  @Column()
  generacion: number;

  @Column()
  ultimo_avance: number;

  @Column()
  estado_finalizacion: boolean;

  @OneToMany(() => Asignacion, (asignacion) => asignacion.tesis, {
    eager: false,
  })
  asignaciones: Asignacion[];
}
