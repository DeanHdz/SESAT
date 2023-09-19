import { GradoEstudio } from "src/grado-estudio/entities/grado-estudio.entity";
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
  id_modalidad: number;

  @Column()
  id_programa: number;

  @Column()
  id_grado_estudio: number;

  @Column()
  generacion: string;

  @Column()
  estado_activo: boolean;

  /*@OneToOne(() => Programa, { eager: true })
  @JoinColumn({ name: "id_programa" })
  programa: Programa;
  */
  @OneToOne(() => GradoEstudio, { eager: true })
  @JoinColumn({ name: "id_grado_estudio" })
  grado_estudio: GradoEstudio;
}
