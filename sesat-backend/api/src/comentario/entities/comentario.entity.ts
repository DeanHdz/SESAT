import { Usuario } from "src/usuario/entities/usuario.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class Comentario {
    @PrimaryColumn()
    id_comentario: number;    

    @Column()
    Clave: number;

    @OneToOne(() => Usuario, { eager: true})
    @JoinColumn({name: 'Clave'})
    usuario: Usuario;
    
    @Column()
    id_asignacion: number;

    @OneToOne(() => Asignacion, { eager: true})
    @JoinColumn({name: 'id_asignacion'})
    asignacion: Asignacion;
    
    @Column()
    Texto: string;
}