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
const reportService_1 = require("../services/reportService");
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield (0, reportService_1.getReports)();
    res.status(200).send(reports);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReport = parseInt(req.params.id);
        const reports = yield (0, reportService_1.getReport)(idReport);
        if (reports != undefined) {
            res.status(200).send(reports);
        }
        else {
            res.status(404).send({ "mensaje": "Reporte no encontrado" });
        }
    }
    catch (_a) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportNew = req.body;
    if (yield (0, reportService_1.addReport)(reportNew)) {
        res.status(200).send(reportNew);
    }
    else {
        res.status(404).send({ "mensaje": "Error al agregar un nuevo Reporte" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportUpdate = req.body;
        const id = parseInt(req.params.id);
        if (yield (0, reportService_1.updateReport)(id, reportUpdate)) {
            res.status(200).send(reportUpdate);
        }
        else {
            res.status(404).send({ "mensaje": "Reporte no actualizado" });
        }
    }
    catch (_b) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReport = parseInt(req.params.id);
        if (yield (0, reportService_1.deleteReport)(idReport)) {
            res.status(200).send({ "mensaje": "Reporte eliminado" });
        }
        else {
            res.status(400).send({ "mensaje": "Error al eliminar al Reporte" });
        }
    }
    catch (_c) {
        res.status(400).send({ "mensaje": "Error en el id" });
    }
}));
exports.default = router;
