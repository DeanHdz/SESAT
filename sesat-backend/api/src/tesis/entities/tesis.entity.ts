import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToMany } from "typeorm";
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Programa } from "src/programa/entities/programa.entity";

@Entity()
export class Tesis {
  @PrimaryColumn()
  id_tesis: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'Clave' })
  Clave_Alumno: number;

  //una tesis puede tener multiples asesores, un asesor puede tener multiples tesis
  @ManyToMany(() => Usuario, { eager: true })
  @JoinColumn({ name: 'Clave' })
  Clave_Asesor: number;

  @OneToOne(() => Programa, { eager: true })
  @JoinColumn({ name: 'id_programa' })
  @Column()
  id_programa: number;

  @Column()
  Titulo: string;

  @Column()
  FechaRegistro: Date;

  @Column()
  Generacion: string;

  @Column()
  Modalidad: string;

}
