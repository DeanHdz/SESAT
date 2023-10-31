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


@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id_comentario: number;

  @Column()
  id_usuario: number;

  /*@ManyToOne(() => Usuario, (usuario) => usuario.comentarios)
  @JoinColumn({ name: "id_usuario" })
  usuario: Usuario;*/

  @Column()
  id_asignacion: number;

  /*@ManyToOne(() => Asignacion, (asignacion) => asignacion.comentarios)
  @JoinColumn({ name: "id_asignacion" })
  asignacion: Asignacion;*/

  @Column()
  texto: string;

  @Column()
  fecha_comentario: Date;
  /*@OneToMany(() => Respuesta, (respuesta) => respuesta.comentario, {
    eager: true,
  })
  respuestas: Respuesta[];*/
}
