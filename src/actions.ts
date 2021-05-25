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
    console.log("Llega");
    if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.height) throw new Exception("Please provide a height")
    if(!req.body.mass) throw new Exception("Please provide a mass")
    if(!req.body.hair) throw new Exception("Please provide a hair")
    if(!req.body.skin_color) throw new Exception("Please provide a skin_color")
    if(!req.body.eye_color) throw new Exception("Please provide a eye_color")
    if(!req.body.birth_year) throw new Exception("Please provide a birth_year")
    if(!req.body.gender) throw new Exception("Please provide a gender")
    
    const user = await getRepository(Characters).findOne({ where: {name: req.body.name} });
    if(user) throw new Exception("User alredy exist");

    const newCharacter = getRepository(Characters).create(req.body);  //Creo un pesonaje
	const results = await getRepository(Characters).save(newCharacter); //Grabo el nuevo personaje 
    return res.json(results);
    
}

export const getCharacters = async (req: Request, res: Response): Promise<Response> =>{
    const characters = await getRepository(Characters).find();
    return res.json(characters);
}

export const createPlanet = async (req: Request, res: Response): Promise<Response> =>{

    if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.orbital_period) throw new Exception("Please provide a orbital_period")
    if(!req.body.surface_water) throw new Exception("Please provide a surface_water")
    if(!req.body.gravity) throw new Exception("Please provide a gravity")
    if(!req.body.population) throw new Exception("Please provide a population")
    if(!req.body.climate) throw new Exception("Please provide a climate")
    if(!req.body.terrain) throw new Exception("Please provide a terrain")
    if(!req.body.diameter) throw new Exception("Please provide a diameter")
    
    const user = await getRepository(Planets).findOne({ where: {name: req.body.name} });
    if(user) throw new Exception("User alredy exist");

    const newPlanet = getRepository(Planets).create(req.body);  //Creo un pesonaje
	const results = await getRepository(Planets).save(newPlanet); //Grabo el nuevo personaje 
    return res.json(results);   
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
    const planets = await getRepository(Planets).find();
    return res.json(planets);
}