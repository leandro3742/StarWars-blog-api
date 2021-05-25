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
exports.__esModule = true;
exports.getPlanets = exports.createPlanet = exports.getCharacters = exports.createCharacter = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var Characters_1 = require("./entities/Characters");
var Planets_1 = require("./entities/Planets");
var utils_1 = require("./utils");
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
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).find()];
            case 1:
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
                console.log("entra");
                data.name = req.body[i].name;
                data.rotation_period = req.body[i].rotation_period;
                data.orbital_period = req.body[i].orbital_period;
                data.surface_water = req.body[i].surface_water;
                data.gravity = req.body[i].gravity;
                data.population = req.body[i].population;
                data.climate = req.body[i].climate;
                data.terrain = req.body[i].terrain;
                data.diameter = req.body[i].diameter;
                console.log(data);
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
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
