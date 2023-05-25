import { Funcion } from "src/funcion/entities/funcion.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comite {
  @PrimaryGeneratedColumn()
  id_comite: number;

  @Column()
  clave_asesor: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.comites)
  @JoinColumn({ name: "clave" })
  asesor: Usuario;

  @Column()
  id_tesis: number;

  @ManyToOne(() => Tesis, (tesis) => tesis.comites)
  @JoinColumn({ name: "id_tesis" })
  tesis: Tesis;

  @Column()
  id_funcion: number;

  @OneToOne(() => Funcion, { eager: true })
  @JoinColumn({ name: "id_funcion" })
  funcion: Funcion;
}
