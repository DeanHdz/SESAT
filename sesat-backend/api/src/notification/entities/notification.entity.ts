import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    notification_id: number;

    @Column()
    user_id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    expedition_date: Date;
}
