import { Comentario } from "src/comentario/entities/comentario.entity";
import { Comite } from "src/comite/entities/comite.entity";
import { DatosAlumno } from "src/datos-alumno/entities/datos-alumno.entity";
import { DatosAsesorExterno } from "src/datos-asesor-externo/entities/datos-asesor-externo.entity";
import { Notificacion } from "src/notification/entities/notification.entity";
import { Rol } from "src/rol/entities/rol.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Usuario {
  @PrimaryColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  password: string;

  @Column()
  id_rol: number;

  @OneToOne(() => Rol, { eager: true })
  @JoinColumn({ name: "id_rol" })
  rol: Rol;

  @Column()
  id_datos_alumno: number;

  @OneToOne(() => DatosAlumno, { eager: true })
  @JoinColumn({ name: "id_datos_alumno" })
  datos_alumno: DatosAlumno;

  @Column()
  correo: string;

  @Column()
  id_datos_asesor_externo: number;

  @OneToOne(() => DatosAsesorExterno, { eager: true })
  @JoinColumn({ name: "id_datos_asesor_externo" })
  datos_asesor_externo: DatosAsesorExterno;

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario, {
    eager: true,
  })
  notificaciones: Notificacion[];

  @OneToMany(() => Comentario, (comentario) => comentario.usuario, {
    eager: true,
  })
  comentarios: Comentario[];
}
