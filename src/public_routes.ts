
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser, login, createCharacter, getCharacters, createPlanet, getPlanets } from './actions';
// import {  getFavCharacter, getFavPlanet, getUsers, createFavCharacter, createFavPlanet, getFav, removeFavCharacter, removeFavPlanet } from './actions';

const router = Router();

// signup route, creates a new user in the DB
//Usuario
router.post('/user', safe(createUser));
router.post('/login', safe(login));
//Personajes
router.post('/people', safe(createCharacter))
router.get('/people', safe(getCharacters))
router.get('/people/:id', safe(getCharacters))

//Planetas
router.post('/planet', safe(createPlanet))
router.get('/planet/:id', safe(getPlanets))
router.get('/planets', safe(getPlanets))

// router.get('/user/:id', safe(getUsers));
// router.post('/user/character/:user_id/:character_id', safe(createFavCharacter));
// router.post('/user/planet/:user_id/:planet_id', safe(createFavPlanet));
// router.get('/user/planet/:user_id', safe(getFavPlanet));
// router.get('/user/character/:user_id', safe(getFavCharacter));



export default router;
