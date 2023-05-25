import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DatosAsesorExterno {
  @PrimaryGeneratedColumn()
  id_datos_asesorexterno: number;

  @Column()
  telefono: string;

  @Column()
  insititucion: string;
}
