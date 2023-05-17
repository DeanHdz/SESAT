import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryColumn()
    clave: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    family_name: string;

    @Column()
    password: string;
}
