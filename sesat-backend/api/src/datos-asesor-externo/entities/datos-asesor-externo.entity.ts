import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DatosAsesorExterno {
    @PrimaryGeneratedColumn()
    id_datos_asesor_externo: number;

    @Column()
    telefono: number;

    @Column()
    institucion: string;
}
