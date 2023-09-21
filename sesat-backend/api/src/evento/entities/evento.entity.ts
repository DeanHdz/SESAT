import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

@Entity()
export class Evento {

@PrimaryGeneratedColumn()
id_evento: number;

@Column()
id_usuario: number;

@Column()
titulo: string;

@Column()
descripcion: string;

@Column()
fecha_inicio: Date;

@Column()
fecha_termino: Date;
}
