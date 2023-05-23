import { Usuario } from "src/usuario/entities/usuario.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Comentario {
    @PrimaryGeneratedColumn()
    id_comentario: number;    

    @Column()
    clave: number;

    @OneToOne(() => Usuario, { eager: true})
    @JoinColumn({name: 'clave'})
    usuario: Usuario;
    
    @Column()
    id_asignacion: number;

    @OneToOne(() => Asignacion, { eager: true})
    @JoinColumn({name: 'id_asignacion'})
    asignacion: Asignacion;
    
    @Column()
    texto: string;
}