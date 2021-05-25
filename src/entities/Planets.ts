import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Planets extends BaseEntity {
    @PrimaryGeneratedColumn()
    planetId: string;

    @Column()
    name: string;

    @Column()
    diameter: string;

    @Column()
    rotation_period: string;

    @Column()
    orbital_period: string;

    @Column()
    gravity: string;

    @Column()
    population: string;

    @Column()
    climate: string;
    
    @Column()
    terrain: string;
    
    @Column()
    surface_water: string;
}