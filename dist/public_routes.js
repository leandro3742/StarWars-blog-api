"use strict";
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
// import {  getFavCharacter, getFavPlanet, getUsers, createFavCharacter, createFavPlanet, getFav, removeFavCharacter, removeFavPlanet } from './actions';
var router = express_1.Router();
// signup route, creates a new user in the DB
//Usuario
router.post('/user', utils_1.safe(actions_1.createUser));
router.post('/login', utils_1.safe(actions_1.login));
//Personajes
router.post('/people', utils_1.safe(actions_1.createCharacter));
router.get('/people', utils_1.safe(actions_1.getCharacters));
router.get('/people/:id', utils_1.safe(actions_1.getCharacters));
//Planetas
router.post('/planet', utils_1.safe(actions_1.createPlanet));
router.get('/planet/:id', utils_1.safe(actions_1.getPlanets));
router.get('/planets', utils_1.safe(actions_1.getPlanets));
// router.get('/user/:id', safe(getUsers));
// router.post('/user/character/:user_id/:character_id', safe(createFavCharacter));
// router.post('/user/planet/:user_id/:planet_id', safe(createFavPlanet));
// router.get('/user/planet/:user_id', safe(getFavPlanet));
// router.get('/user/character/:user_id', safe(getFavCharacter));
exports["default"] = router;
