import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DatosAsesorexterno {
    @PrimaryGeneratedColumn()
    id_datos_asesor_externo: number;

    @Column()
    telefono: string;

    @Column()
    institucion: string;
}
