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
const pondServices_1 = require("../services/pondServices");
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ponds = yield (0, pondServices_1.getPonds)();
    res.status(200).send(ponds);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPond = parseInt(req.params.id);
        const pond = yield (0, pondServices_1.getPond)(idPond);
        if (pond != undefined) {
            res.status(200).send(pond);
        }
        else {
            res.status(404).send({ "mensaje": "Estanque no encontrado" });
        }
    }
    catch (_a) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pondNew = req.body;
    if (yield (0, pondServices_1.addPond)(pondNew)) {
        res.status(200).send(pondNew);
    }
    else {
        res.status(404).send({ "mensaje": "Error al agregar un nuevo estanque" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pondUpdate = req.body;
        const id = parseInt(req.params.id);
        if (yield (0, pondServices_1.updatePond)(id, pondUpdate)) {
            res.status(200).send(pondUpdate);
        }
        else {
            res.status(404).send({ "mensaje": "Estanque no actualizado" });
        }
    }
    catch (_b) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPond = parseInt(req.params.id);
        if (yield (0, pondServices_1.deletePond)(idPond)) {
            res.status(200).send({ "mensaje": "Estanque eliminado" });
        }
        else {
            res.status(400).send({ "mensaje": "Error al eliminar al estanque" });
        }
    }
    catch (_c) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.get("/state/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPond = parseInt(req.params.id);
        const statePond = yield (0, pondServices_1.getState)(idPond);
        if (statePond != undefined) {
            res.status(200).send(statePond);
        }
        else {
            res.status(404).send({ "mensaje": "Estanque no encontrado" });
        }
    }
    catch (_d) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
exports.default = router;
