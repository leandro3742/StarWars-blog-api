"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getPlanets = exports.createPlanet = exports.getCharacters = exports.createCharacter = exports.removeFavPlanet = exports.getFavPlanet = exports.createFavPlanet = exports.removeFavCharacter = exports.getFavCharacter = exports.createFavCharacter = exports.getFav = exports.login = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Users_1 = require("./entities/Users");
var Characters_1 = require("./entities/Characters");
var Planets_1 = require("./entities/Planets");
var utils_1 = require("./utils");
var FavCharacters_1 = require("./entities/FavCharacters");
var FavPlanets_1 = require("./entities/FavPlanets");
////  USERS ////
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUsers = getUsers;
//controlador para el logueo
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var getFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, characters, planets, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found");
                return [4 /*yield*/, typeorm_1.getRepository(FavCharacters_1.FavCharacters).find({ where: { user: user }, relations: ['Character'] })];
            case 2:
                characters = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets).find({ where: { user: user }, relations: ['planet'] })];
            case 3:
                planets = _a.sent();
                list = [];
                list[0] = characters;
                list[1] = planets;
                return [2 /*return*/, res.json(list)];
        }
    });
}); };
exports.getFav = getFav;
//// FAV CHARACTERS ////
var createFavCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, character, newFav, newFavCharacter, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("The user not exists ");
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne(req.params.character_id)];
            case 2:
                character = _a.sent();
                if (!character)
                    throw new utils_1.Exception("The character not exist");
                newFav = new FavCharacters_1.FavCharacters();
                newFav.user = user;
                newFav.Character = character;
                newFavCharacter = typeorm_1.getRepository(FavCharacters_1.FavCharacters).create(newFav);
                return [4 /*yield*/, typeorm_1.getRepository(FavCharacters_1.FavCharacters).save(newFavCharacter)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createFavCharacter = createFavCharacter;
var getFavCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found");
                return [4 /*yield*/, typeorm_1.getRepository(FavCharacters_1.FavCharacters).find({ where: { user: user }, relations: ['Character'] })];
            case 2:
                list = _a.sent();
                return [2 /*return*/, res.json(list)];
        }
    });
}); };
exports.getFavCharacter = getFavCharacter;
var removeFavCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, character, FavCharacter, newFavCharacter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("The user not exists ");
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne(req.params.character_id)];
            case 2:
                character = _a.sent();
                if (!character)
                    throw new utils_1.Exception("The character not exist");
                return [4 /*yield*/, typeorm_1.getRepository(FavCharacters_1.FavCharacters).find({ where: { Character: character } })];
            case 3:
                FavCharacter = _a.sent();
                newFavCharacter = typeorm_1.getRepository(FavCharacters_1.FavCharacters).remove(FavCharacter);
                // const results = await getRepository(FavCharacters).save(newFavCharacter); //Grabo el nuevo Personaje favorito
                return [2 /*return*/, res.json("The character was deleted")];
        }
    });
}); };
exports.removeFavCharacter = removeFavCharacter;
//// FAV PLANETS ////
var createFavPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, planet, newFav, newFavPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("The user not exists ");
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.planet_id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("The planet not exist");
                newFav = new FavPlanets_1.FavPlanets();
                newFav.user = user;
                newFav.planet = planet;
                newFavPlanet = typeorm_1.getRepository(FavPlanets_1.FavPlanets).create(newFav);
                return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets).save(newFavPlanet)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createFavPlanet = createFavPlanet;
var getFavPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found");
                return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets).find({ where: { user: user }, relations: ['planet'] })];
            case 2:
                list = _a.sent();
                return [2 /*return*/, res.json(list)];
        }
    });
}); };
exports.getFavPlanet = getFavPlanet;
var removeFavPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, planet, FavPlanet, newFavPlanet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("The user not exists ");
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.planet_id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("The planet not exist");
                return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets).find({ where: { planet: planet } })];
            case 3:
                FavPlanet = _a.sent();
                newFavPlanet = typeorm_1.getRepository(FavPlanets_1.FavPlanets).remove(FavPlanet);
                return [2 /*return*/, res.json("The planet was deleted")];
        }
    });
}); };
exports.removeFavPlanet = removeFavPlanet;
////  CHARACTERS ////
var createCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, i, user, newCharacter, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = new Characters_1.Characters();
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < req.body.length)) return [3 /*break*/, 5];
                //Casteo el body para quedarme con los elementos que me interesan
                data.name = req.body[i].name;
                data.height = req.body[i].height;
                data.mass = req.body[i].mass;
                data.hair = req.body[i].hair_color;
                data.skin_color = req.body[i].skin_color;
                data.eye_color = req.body[i].eye_color;
                data.birth_year = req.body[i].birth_year;
                data.gender = req.body[i].gender;
                if (!data.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!data.height)
                    throw new utils_1.Exception("Please provide a height");
                if (!data.mass)
                    throw new utils_1.Exception("Please provide a mass");
                if (!data.hair)
                    throw new utils_1.Exception("Please provide a hair");
                if (!data.skin_color)
                    throw new utils_1.Exception("Please provide a skin_color");
                if (!data.eye_color)
                    throw new utils_1.Exception("Please provide a eye_color");
                if (!data.birth_year)
                    throw new utils_1.Exception("Please provide a birth_year");
                if (!data.gender)
                    throw new utils_1.Exception("Please provide a gender");
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne({ where: { name: data.name } })];
            case 2:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("User alredy exist");
                newCharacter = typeorm_1.getRepository(Characters_1.Characters).create(data);
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).save(newCharacter)];
            case 3:
                results = _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, res.json("Ok")];
        }
    });
}); };
exports.createCharacter = createCharacter;
var getCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters, characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.id) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne(req.params.id)];
            case 1:
                characters = _a.sent();
                return [2 /*return*/, res.json(characters)];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).find()];
            case 3:
                characters = _a.sent();
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.getCharacters = getCharacters;
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, i, user, newPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = new Planets_1.Planets();
                console.log(req.body);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < req.body.length)) return [3 /*break*/, 5];
                data.name = req.body[i].name;
                data.rotation_period = req.body[i].rotation_period;
                data.orbital_period = req.body[i].orbital_period;
                data.surface_water = req.body[i].surface_water;
                data.gravity = req.body[i].gravity;
                data.population = req.body[i].population;
                data.climate = req.body[i].climate;
                data.terrain = req.body[i].terrain;
                data.diameter = req.body[i].diameter;
                if (!data.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!data.orbital_period)
                    throw new utils_1.Exception("Please provide a orbital_period");
                if (!data.surface_water)
                    throw new utils_1.Exception("Please provide a surface_water");
                if (!data.gravity)
                    throw new utils_1.Exception("Please provide a gravity");
                if (!data.population)
                    throw new utils_1.Exception("Please provide a population");
                if (!data.climate)
                    throw new utils_1.Exception("Please provide a climate");
                if (!data.terrain)
                    throw new utils_1.Exception("Please provide a terrain");
                if (!data.diameter)
                    throw new utils_1.Exception("Please provide a diameter");
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne({ where: { name: data.name } })];
            case 2:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("User alredy exist");
                newPlanet = typeorm_1.getRepository(Planets_1.Planets).create(data);
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanet)];
            case 3:
                results = _a.sent();
                console.log(results);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5:
                ;
                return [2 /*return*/, res.json("Ok")];
        }
    });
}); };
exports.createPlanet = createPlanet;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets, planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.id) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 3:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
