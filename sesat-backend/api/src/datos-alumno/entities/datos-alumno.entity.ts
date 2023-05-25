import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DatosAlumno 
{
  
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

}