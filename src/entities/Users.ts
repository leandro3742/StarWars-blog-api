import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany,
    BaseEntity, JoinTable
} from 'typeorm';

import { FavCharacters } from "./FavCharacters";
import { FavPlanets} from "./FavPlanets";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    password: string;

    @OneToMany(() => FavCharacters, FavCharacter => FavCharacter.user)
    onDelete: "CASCADE";
    FavCharacter: FavCharacters[];
    
    @OneToMany(() => FavPlanets, FavPlanet => FavPlanet.user)
    FavPlanet: FavPlanets[];
}