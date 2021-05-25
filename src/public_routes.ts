
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser, getUsers, createFavCharacter, getFavCharacter, createCharacter, getCharacters, createPlanet, getPlanets } from './actions';

const router = Router();

// signup route, creates a new user in the DB
//Usuario
router.post('/user', safe(createUser));
router.get('/user/:id', safe(getUsers));
router.post('/user/:user_id/:character_id', safe(createFavCharacter));
router.get('/user/character/:user_id', safe(getFavCharacter));
//Personajes
router.post('/character', safe(createCharacter))
router.get('/character', safe(getCharacters))

//Planetas
router.post('/planet', safe(createPlanet))
router.get('/planet', safe(getPlanets))


export default router;
