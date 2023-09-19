import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modalidad {
    @PrimaryGeneratedColumn()
    id_modalidad: number;

    @Column()
    nombre_modalidad: string;
}
