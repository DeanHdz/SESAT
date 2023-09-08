import { Usuario } from "src/usuario/entities/usuario.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Respuesta } from "src/respuesta/entities/respuesta.entity";

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id_comentario: number;

  @Column()
  clave_usuario: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.comentarios)
  @JoinColumn({ name: "clave_usuario" })
  usuario: Usuario;

  @Column()
  id_asignacion: number;

  @ManyToOne(() => Asignacion, (asignacion) => asignacion.comentarios)
  @JoinColumn({ name: "id_asignacion" })
  asignacion: Asignacion;

  @Column()
  texto: string;

  @OneToMany(() => Respuesta, (respuesta) => respuesta.comentario, {
    eager: true,
  })
  respuestas: Respuesta[];
}
