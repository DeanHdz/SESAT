import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Alumno {
  @Column()
  Clave: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'Clave' })
  usuario: Usuario;

  @Column()
  Estado_Activo: number;

  @Column()
  Ultimo_Avance: number;
}