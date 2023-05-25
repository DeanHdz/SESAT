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
    id_rol: number;

    @Column()
    id_datos_alumno: number;

    @Column()
    correo: string;
    
    @Column()
    id_datos_asesorexterno: number;
}
