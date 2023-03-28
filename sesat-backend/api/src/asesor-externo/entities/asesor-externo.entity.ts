import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity()
export class AsesorExterno {
  @PrimaryColumn()
  asesor_externo: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'Clave' })
  clave: number;

  @Column()
  telefono: string;

  @Column()
  institucion: string;

  @Column()
  nombre: string;

  @Column()
  apellidopaterno: string;

  @Column()
  apellidomaterno: string;

  @Column()
  correo: string;
}
