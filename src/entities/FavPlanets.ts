import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne,
    BaseEntity, JoinTable, JoinColumn
} from 'typeorm';
import { Planets } from "./Planets";
import { Users } from "./Users";

@Entity()
export class FavPlanets extends BaseEntity{
    @PrimaryGeneratedColumn()
    favId: number;
    
    @ManyToOne(() => Users, user => user.FavPlanet)
    user: Users;

    @OneToOne(() => Planets)
    @JoinColumn()
    planet: Planets;

}