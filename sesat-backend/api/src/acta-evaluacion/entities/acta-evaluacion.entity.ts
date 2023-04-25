import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { FormatosVacios } from 'src/formatos-vacios/entities/formatos-vacios.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ActaEvaluacion {
    @PrimaryColumn()
    id_acta: number;

    @Column()
    id_asignacion: number;
    /* 
    restriccion eliminada para pruebas
    @OneToOne(() => Asignacion, {eager: true})
    @JoinColumn({name: 'id_asignacion'})
    asignacion: Asignacion;
    */

    @Column({type: "bytea"})
    documento_rellenado;
    
    @Column()
    id_acta_vacia: number;  
    
    @OneToOne(() => FormatosVacios, {eager: true})
    @JoinColumn({name: 'id_acta_vacia'})
    formato: FormatosVacios;

}
