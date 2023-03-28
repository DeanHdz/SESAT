import { Entity, Column, OneToOne, JoinColumn, Unique} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";

@Entity()
@Unique(["Clave","id_tesis"])
export class CoAsesor {
  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'Clave' })
  Clave: number;

  @OneToOne(() => Tesis, { eager: true })
  @JoinColumn({ name: 'id_tesis' })
  id_tesis: number;
}
