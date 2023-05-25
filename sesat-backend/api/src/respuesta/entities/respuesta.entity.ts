import { Comentario } from "src/comentario/entities/comentario.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id_respuesta: number;

  @Column()
  id_comentario: number;

  @ManyToOne(() => Comentario, (comentario) => comentario.respuestas)
  @JoinColumn({ name: "id_comentario" })
  comentario: Comentario;

  @Column()
  texto: string;

  @Column()
  clave_usuario: number;
}
