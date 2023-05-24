import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id_notificacion: number;

    @Column()
    clave_usuario: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    fecha_expedicion: Date;
}
