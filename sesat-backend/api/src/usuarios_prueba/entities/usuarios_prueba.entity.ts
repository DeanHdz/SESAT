import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UsuariosPrueba {
    @PrimaryColumn()
    clave_unica: number;

    @Column()
    nombre: string;

    @Column()
    password: string;

    @Column()
    apellido_pat: string;

    @Column()
    apellido_mat: string;
}
