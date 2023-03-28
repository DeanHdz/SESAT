import { Entity, Column, OneToMany, JoinColumn, PrimaryColumn, Timestamp} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import path from "path";

@Entity()
export class Asignacion {
  @PrimaryColumn()
  id_asignacion: number

  @OneToMany(() => Tesis, (tesis) => tesis.id_tesis)
  @Column() //?
  id_tesis: number

  @Column()
  num_Avance: number

  @Column()
  Titulo: string

  @Column()
  Descripcion: string

  @Column()
  Apertura: Timestamp

  @Column()
  Cierre: Timestamp

  @Column()
  calificacion: number

  @Column()
  Documento: string

  @Column()
  Estado_Entrega: number
}
