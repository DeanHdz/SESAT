import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Alumno {
  @PrimaryColumn()
  alumno_id: number;

  @Column()
  clave: number;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'clave' })
  usuario: Usuario;

  @Column()
  estado_activo: number;

  @Column()
  ultimo_avance: number;
}