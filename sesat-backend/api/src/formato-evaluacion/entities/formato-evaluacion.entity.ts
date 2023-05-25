import { FormatosVacios } from "src/formatos-vacios/entities/formatos-vacios.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class FormatoEvaluacion {
  @PrimaryGeneratedColumn()
  id_formato_evaluacion: number;

  @Column({ type: "bytea" })
  documento_rellenado: string;

  @Column()
  id_formato_vacio: number;

  @OneToOne(() => FormatosVacios, { eager: true })
  @JoinColumn({ name: "id_formatos_vacios" })
  formatos_vacios: FormatosVacios;
}
