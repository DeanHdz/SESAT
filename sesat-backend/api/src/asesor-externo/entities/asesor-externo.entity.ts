import { Entity, Column, OneToOne, JoinColumn} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity()
export class AsesorExterno {
  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'Clave' })
  Clave: number;

  @Column()
  Telefono: string;

  @Column()
  Institucion: string;

  @Column()
  Nombre: string;

  @Column()
  ApellidoPaterno: string;

  @Column()
  ApellidoMaterno: string;

  @Column()
  Correo: string;
}
