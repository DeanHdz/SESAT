import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Programa {
  @PrimaryGeneratedColumn()
  id_programa: number;

  @Column()
  nombre_programa: string;
}
