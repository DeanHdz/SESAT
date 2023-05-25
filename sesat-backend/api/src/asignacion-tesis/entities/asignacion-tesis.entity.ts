import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class AsignacionTesis {
  @PrimaryGeneratedColumn()
  id_asignacion_tesis: number;

  @Column()
  id_asignacion: number;

  @ManyToOne(() => Asignacion, (asignacion) => asignacion.asignaciones_tesis)
  @JoinColumn({ name: "id_asignacion" })
  asignacion: Asignacion;

  @Column()
  id_tesis: number;

  @ManyToOne(() => Tesis, (tesis) => tesis.asignaciones_tesis)
  @JoinColumn({ name: "id_tesis" })
  tesis: Tesis;
}
