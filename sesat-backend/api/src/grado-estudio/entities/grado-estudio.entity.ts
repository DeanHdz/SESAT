import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GradoEstudio {
    @PrimaryGeneratedColumn()
    id_grado_estudio: number;
  
    @Column()
    nombre_grado_estudio: string;
}
