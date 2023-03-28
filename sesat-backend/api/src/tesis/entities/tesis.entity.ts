import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Programa } from "src/programa/entities/programa.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";

@Entity()
export class Tesis {
  @PrimaryColumn()
  id_tesis: number;

  @Column()
  clave_alumno: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'clave_alumno' })
  claveAlumno: Usuario;

  @Column()
  clave_asesor: number;

  //una tesis puede tener multiples asesores, un asesor puede tener multiples tesis
  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({name: 'clave_asesor'})
  claveAsesor: Usuario

  @Column()
  id_programa: number;

  @OneToOne(() => Programa, { eager: true })
  @JoinColumn({ name: 'id_programa' })
  idPrograma: Programa;

  @Column()
  titulo: string;

  @Column()
  fecharegistro: Date;

  @Column()
  generacion: string;

  @Column()
  modalidad: string;

  //@ManyToOne(() => Asignacion, (asignacion) => asignacion.id_tesis)
  //asignacion: Asignacion;

}
