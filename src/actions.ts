import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import jwt from 'jsonwebtoken'

import { Users } from './entities/Users'
import { Characters } from './entities/Characters';
import { Planets } from './entities/Planets';
import { Exception } from './utils'
import { FavCharacters } from './entities/FavCharacters';
import { FavPlanets } from './entities/FavPlanets';

////  USERS ////
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

//controlador para el logueo
export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)


	// We need to validate that a user with this email and password exists in the DB
	const user = await getRepository(Users).findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}
//// FAV CHARACTERS ////
export const createFavCharacter = async (req: Request, res: Response): Promise<Response> =>{
    // req.params.user_id
    // req.params.character_id
    const user = await getRepository(Users).findOne(req.params.user_id);
    if(!user) throw new Exception("The user not exists ")
    const character = await getRepository(Characters).findOne(req.params.character_id);
    if(!character) throw new Exception("The character not exist");
    
    const newFav = new FavCharacters();
    newFav.user = user;
    newFav.Character = character;

    const newFavCharacter = getRepository(FavCharacters).create(newFav);  //Creo un Personaje favorito
	const results = await getRepository(FavCharacters).save(newFavCharacter); //Grabo el nuevo Personaje favorito
	return res.json(results);
}

export const getFavCharacter = async (req: Request, res: Response): Promise<Response> =>{
    const user = await getRepository(Users).findOne(req.params.user_id);
    if(!user) throw new Exception("User not found");

    const list = await getRepository(FavCharacters).find({ where: {user: user}, relations:['Character'] });
    return res.json(list);
}
//// FAV PLANETS ////
export const createFavPlanet = async (req: Request, res: Response): Promise<Response> =>{
    // req.params.user_id
    // req.params.planet_id
    const user = await getRepository(Users).findOne(req.params.user_id);
    if(!user) throw new Exception("The user not exists ")
    const planet = await getRepository(Planets).findOne(req.params.planet_id);
    if(!planet) throw new Exception("The planet not exist");
    
    const newFav = new FavPlanets();
    newFav.user = user;
    newFav.planet = planet;

    const newFavPlanet = getRepository(FavPlanets).create(newFav);  //Creo un Planeta favorito
	const results = await getRepository(FavPlanets).save(newFavPlanet); //Grabo el nuevo Planeta favorito
	return res.json(results);
}

export const getFavPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const user = await getRepository(Users).findOne(req.params.user_id);
    if(!user) throw new Exception("User not found");

    const list = await getRepository(FavPlanets).find({ where: {user: user}, relations:['planet'] });
    return res.json(list);
}

////  CHARACTERS ////
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
    if(req.params.id){ //Significa que elije un personaje
        const characters = await getRepository(Characters).findOne(req.params.id);
        return res.json(characters);
    }
    else{
        const characters = await getRepository(Characters).find();
        return res.json(characters);
    }
}

export const createPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const data = new Planets();
    console.log(req.body);
    for(let i=0; i< req.body.length; i++){
        data.name = req.body[i].name;
        data.rotation_period = req.body[i].rotation_period;
        data.orbital_period = req.body[i].orbital_period;
        data.surface_water = req.body[i].surface_water;
        data.gravity = req.body[i].gravity;
        data.population =req.body[i].population;
        data.climate = req.body[i].climate;
        data.terrain = req.body[i].terrain;
        data.diameter = req.body[i].diameter;

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
    if(req.params.id){
        const planets = await getRepository(Planets).findOne(req.params.id);
        return res.json(planets);
    }
    else{
        const planets = await getRepository(Planets).find();
        return res.json(planets);   
    }
    
}