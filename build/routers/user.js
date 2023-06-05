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
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userServices_1.getUsers)();
    res.status(200).send(users);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = parseInt(req.params.id);
        const user = yield (0, userServices_1.getUser)(idUser);
        res.status(200).send(user);
    }
    catch (_a) {
        res.status(400).send("Error en el id");
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userNew = req.body;
    const idUSer = yield (0, userServices_1.addUser)(userNew);
    if (idUSer > 0) {
        res.status(201).send(idUSer);
    }
    else {
        res.status(400).send("Error en la carga del usuario");
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = parseInt(req.params.id);
        if (yield (0, userServices_1.deleteUser)(idUser)) {
            res.status(200);
        }
        else {
            res.status(400).send("Error al eliminar al usuario");
        }
    }
    catch (_b) {
        res.status(400).send("Error en el id");
    }
}));
exports.default = router;
