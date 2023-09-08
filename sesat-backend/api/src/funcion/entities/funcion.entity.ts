import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Funcion {
    @PrimaryGeneratedColumn()
    id_funcion: number;

    @Column()
    nombre: string;

}
