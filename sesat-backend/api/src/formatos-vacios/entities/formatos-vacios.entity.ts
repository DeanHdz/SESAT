import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FormatosVacios {
    @PrimaryColumn()
    id_formatos: number;

    @Column({type: 'bytea'})
    acta_evaluacion;

    @Column({type: 'bytea'})
    formato_evaluacion;
}
