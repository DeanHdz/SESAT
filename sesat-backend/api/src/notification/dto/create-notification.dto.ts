import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    decription: string;

    @IsNotEmpty()
    @IsDate()
    expedition_date: Date;
}
