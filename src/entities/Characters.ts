import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn } from "typeorm";
import { FavCharacters } from "./FavCharacters";

@Entity()
export class Characters extends BaseEntity{
    @PrimaryGeneratedColumn()
    characterId: number;

    @Column()
    name: string;

    @Column()
    height: number;

    @Column()
    mass: number;

    @Column()
    hair: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

}