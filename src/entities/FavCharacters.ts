import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,
    BaseEntity, JoinTable, OneToOne, JoinColumn
} from 'typeorm';
import { Characters } from "./Characters";
import { Users } from "./Users";

@Entity()
export class FavCharacters extends BaseEntity{
    @PrimaryGeneratedColumn()
    favId: number;

    @ManyToOne(() => Users, user => user.FavCharacter)
    user: Users;

    @OneToOne(() => Characters)
    @JoinColumn()
    Character: Characters;

}