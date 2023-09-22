import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Periodo {
  @PrimaryGeneratedColumn()
  id_periodo: number;

  @Column()
  fecha_apertura: Date;

  @Column()
  fecha_cierre: Date;
}
