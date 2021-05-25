import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Characters } from './entities/Characters';
import { Planets } from './entities/Planets';
import { Exception } from './utils'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")
    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const user = await getRepository(Users).find();
		return res.json(user);
}

export const createCharacter = async (req: Request, res: Response): Promise<Response> =>{
    const data = new Characters();
    
    for(let i=0; i< req.body.length; i++){
        //Casteo el body para quedarme con los elementos que me interesan
        data.name = req.body[i].name;
        data.height = req.body[i].height;
        data.mass = req.body[i].mass;
        data.hair = req.body[i].hair_color;
        data.skin_color = req.body[i].skin_color;
        data.eye_color = req.body[i].eye_color;
        data.birth_year = req.body[i].birth_year;
        data.gender = req.body[i].gender;

        if(!data.name) throw new Exception("Please provide a name")
        if(!data.height) throw new Exception("Please provide a height")
        if(!data.mass) throw new Exception("Please provide a mass")
        if(!data.hair) throw new Exception("Please provide a hair")
        if(!data.skin_color) throw new Exception("Please provide a skin_color")
        if(!data.eye_color) throw new Exception("Please provide a eye_color")
        if(!data.birth_year) throw new Exception("Please provide a birth_year")
        if(!data.gender) throw new Exception("Please provide a gender")
    
        const user = await getRepository(Characters).findOne({ where: {name: data.name} });
        if(user) throw new Exception("User alredy exist");

        const newCharacter = getRepository(Characters).create(data);  //Creo un pesonaje
        const results = await getRepository(Characters).save(newCharacter); //Grabo el nuevo personaje 
    }
    return res.json("Ok");
}

export const getCharacters = async (req: Request, res: Response): Promise<Response> =>{
    const characters = await getRepository(Characters).find();
    return res.json(characters);
}

export const createPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const data = new Planets();
    console.log(req.body);
    for(let i=0; i< req.body.length; i++){
        console.log("entra");
        data.name = req.body[i].name;
        data.rotation_period = req.body[i].rotation_period;
        data.orbital_period = req.body[i].orbital_period;
        data.surface_water = req.body[i].surface_water;
        data.gravity = req.body[i].gravity;
        data.population =req.body[i].population;
        data.climate = req.body[i].climate;
        data.terrain = req.body[i].terrain;
        data.diameter = req.body[i].diameter;
        console.log(data);
        if(!data.name) throw new Exception("Please provide a name")
        if(!data.orbital_period) throw new Exception("Please provide a orbital_period")
        if(!data.surface_water) throw new Exception("Please provide a surface_water")
        if(!data.gravity) throw new Exception("Please provide a gravity")
        if(!data.population) throw new Exception("Please provide a population")
        if(!data.climate) throw new Exception("Please provide a climate")
        if(!data.terrain) throw new Exception("Please provide a terrain")
        if(!data.diameter) throw new Exception("Please provide a diameter")

        const user = await getRepository(Planets).findOne({ where: {name: data.name} });
        if(user) throw new Exception("User alredy exist");

        const newPlanet = getRepository(Planets).create(data);  //Creo un pesonaje
        const results = await getRepository(Planets).save(newPlanet); //Grabo el nuevo personaje
        console.log(results);
    };

        return res.json("Ok");   
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
    const planets = await getRepository(Planets).find();
    return res.json(planets);
}