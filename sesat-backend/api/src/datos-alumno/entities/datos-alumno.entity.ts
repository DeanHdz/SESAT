import { Programa } from "src/programa/entities/programa.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class DatosAlumno {
  @PrimaryGeneratedColumn()
  id_datos_alumno: number;

  @Column()
  grado_estudio: string;

  @Column()
  modalidad: string;

  @Column()
  estado_activo: boolean;

  @Column()
  id_programa: number;

  @Column()
  generacion: string;

  @OneToOne(() => Programa, { eager: true })
  @JoinColumn({ name: "id_programa" })
  programa: Programa;
}
