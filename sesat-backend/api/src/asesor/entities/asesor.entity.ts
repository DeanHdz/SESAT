import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity()
export class Asesor {
  @PrimaryColumn()
  asesor_id: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'clave' })
  clave: number;

  @Column()
  sinodal: number;

  @Column()
  nombre: string;
}
