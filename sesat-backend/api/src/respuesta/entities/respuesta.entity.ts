import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Respuesta {
    @PrimaryGeneratedColumn()
    id_respuesta: number;

    @Column()
    id_comentario: number;

    //@ManyToOne()

    @Column()
    text: string;

    @Column()
    clave: number;
}
