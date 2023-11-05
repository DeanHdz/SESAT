import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VariablesSistema {
    @PrimaryGeneratedColumn()
    id_variables_sistema: number;

    @Column()
    indice_clave_asesor_externo: number;

}
