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
const equipmentServices_1 = require("../services/equipmentServices");
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const equipment = yield (0, equipmentServices_1.getEquipments)();
    res.status(200).send(equipment);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idEquipment = parseInt(req.params.id);
        const equipment = yield (0, equipmentServices_1.getEquipment)(idEquipment);
        if (equipment != undefined) {
            res.status(200).send(equipment);
        }
        else {
            res.status(404).send({ "mensaje": "Equipo no encontrado" });
        }
    }
    catch (_a) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const equipmentNew = req.body;
    if (yield (0, equipmentServices_1.addEquipment)(equipmentNew)) {
        res.status(200).send(equipmentNew);
    }
    else {
        res.status(404).send({ "mensaje": "Error al agregar un nuevo equipo" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idEquipment = parseInt(req.params.id);
        if (yield (0, equipmentServices_1.deleteEquipment)(idEquipment)) {
            res.status(200).send({ "mensaje": "Equipo eliminado" });
        }
        else {
            res.status(400).send({ "mensaje": "Error al eliminar al equipo" });
        }
    }
    catch (_b) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.put("/openbomb/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (yield (0, equipmentServices_1.updateBomb)(id, true)) {
            res.status(200).send({ "mensaje": "Bomba abierta" });
        }
        else {
            res.status(404).send({ "mensaje": "Bomba no actualizado" });
        }
    }
    catch (_c) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.put("/closeBomb/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (yield (0, equipmentServices_1.updateBomb)(id, false)) {
            res.status(200).send({ "mensaje": "Bomba cerrada" });
        }
        else {
            res.status(404).send({ "mensaje": "Bomba no actualizado" });
        }
    }
    catch (_d) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.put("/time/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timeEquip = req.body;
        const id = parseInt(req.params.id);
        if (yield (0, equipmentServices_1.updateTime)(id, timeEquip)) {
            res.status(200).send({ "mensaje": "Tiempo actualizado" });
        }
        else {
            res.status(404).send({ "mensaje": "Tiempo no actualizado" });
        }
    }
    catch (_e) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
exports.default = router;
