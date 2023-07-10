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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServices_1 = require("../services/userServices");
const sendMail_1 = require("../utils/sendMail");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userServices_1.getUsers)();
    res.status(200).send(users);
}));
router.get('/testMail', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isVal = yield (0, sendMail_1.sendMail_utils)({ typeMsg: 'error', res });
        if (!isVal)
            throw new Error('error');
        res.status(200).send({ message: 'Correo enviado correctamente' });
    }
    catch (err) {
        res.status(400).send({ message: 'Error enviando el correo', err });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = parseInt(req.params.id);
        const user = yield (0, userServices_1.getUser)(idUser);
        if (user != undefined) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send({ mensaje: 'Usuario no encontrado' });
        }
    }
    catch (_a) {
        res.status(400).send({ mensaje: 'Error en el id' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userNew = req.body;
    const idUSer = yield (0, userServices_1.addUser)(userNew);
    if (idUSer >= 0) {
        res.status(201).send({ id: idUSer });
    }
    else {
        res.status(400).send({ mensaje: 'Error en la carga del usuario' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            id: parseInt(req.params.id),
            name: req.body.name,
            email: req.body.email,
        };
        if (yield (0, userServices_1.updateUser)(user)) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send({ mensaje: 'usuario no actualizado' });
        }
    }
    catch (_b) {
        res.status(400).send({ mensaje: 'Error en el id' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = parseInt(req.params.id);
        if (yield (0, userServices_1.deleteUser)(idUser)) {
            res.status(200).send({ mensaje: 'Usuario eliminado' });
        }
        else {
            res.status(400).send({ mensaje: 'Error al eliminar al usuario' });
        }
    }
    catch (_c) {
        res.status(400).send({ mensaje: 'Error en el id' });
    }
}));
exports.default = router;
