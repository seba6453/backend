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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTime = exports.updateBomb = exports.deleteEquipment = exports.addEquipment = exports.getEquipment = exports.getEquipments = void 0;
const dataBase_1 = require("../dataBase");
const getEquipments = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from equipment;`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const ponds = yield result.rows;
        return ponds;
    }
    return undefined;
});
exports.getEquipments = getEquipments;
const getEquipment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT id, pump_state, start_time, end_time, 
    end_time - start_time AS total_time 
    FROM equipment where id = ${id};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const pond = yield result.rows[0];
        return pond;
    }
    return undefined;
});
exports.getEquipment = getEquipment;
const addEquipment = (equipment) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO equipment (start_time, end_time)
    VALUES ('${equipment.start_time}', '${equipment.end_time}');;
    `;
    try {
        yield dataBase_1.client.query(query);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.addEquipment = addEquipment;
const deleteEquipment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ` DELETE FROM equipment WHERE id = ${id};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deleteEquipment = deleteEquipment;
const updateBomb = (id, bool) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `UPDATE equipment
    SET pump_state = ${bool}
    WHERE id = ${id};
    `;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.updateBomb = updateBomb;
const updateTime = (id, equipmentUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `UPDATE equipment
    SET pump_state = ${equipmentUpdate.pump_state},
        hora_inicio = '${equipmentUpdate.start_time}',
        hora_termino = '${equipmentUpdate.end_time}'
    WHERE id = ${id};
    `;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.updateTime = updateTime;
