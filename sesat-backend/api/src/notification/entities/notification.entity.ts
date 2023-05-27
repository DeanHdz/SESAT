import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notificacion {
    @PrimaryGeneratedColumn()
    id_notificacion: number;

    @Column()
    clave_usuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones)
    @JoinColumn({name: 'clave_usuario'})
    usuario: Usuario

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    fecha_expedicion: Date;

}
