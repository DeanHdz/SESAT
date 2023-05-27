import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DatosAsesorexterno {
    @PrimaryGeneratedColumn()
    id_datos_asesorexterno: number;

    @Column()
    telefono: string;

    @Column()
    institucion: string;
}
