import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryColumn()
    clave: number;

    @Column()
    nombre: string;

    @Column()
    apellido_paterno: string;

    @Column()
    apellido_materno: string;

    @Column()
    password: string;

    @Column()
    rol: number;

    @Column()
    estado_activo: boolean;

    @Column()
    modalidad: number;
}
