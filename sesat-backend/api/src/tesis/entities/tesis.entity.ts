import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Programa } from "src/programa/entities/programa.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { AsignacionTesis } from "src/asignacion-tesis/entities/asignacion-tesis.entity";
import { Comite } from "src/comite/entities/comite.entity";

@Entity()
export class Tesis {
  @PrimaryGeneratedColumn()
  id_tesis: number;

  @Column()
  clave_alumno: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: "clave_alumno" })
  alumno: Usuario;

  @Column()
  titulo: string;

  @Column()
  fecharegistro: Date;

  @Column()
  generacion: string;

  @Column()
  registrada: boolean;

  @Column()
  ultimo_avance: number;

  @Column()
  estado_activo: boolean;

  @OneToMany(
    () => AsignacionTesis,
    (asignacionTesis) => asignacionTesis.tesis,
    {
      eager: true,
    }
  )
  asignaciones_tesis: AsignacionTesis[];
}
