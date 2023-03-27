import { Entity, Column, OneToOne, JoinColumn} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class Asesor {
  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'Clave' })
  Clave: number;

  @Column()
  Sinodal: number;
}
