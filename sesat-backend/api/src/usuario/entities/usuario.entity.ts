import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryColumn()
    clave: number;
}
