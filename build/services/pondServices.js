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
exports.deletePond = exports.addPond = exports.updatePond = exports.getPond = exports.getPonds = void 0;
const dataBase_1 = require("../dataBase");
const getPonds = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from pond;`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const ponds = yield result.rows;
        return ponds;
    }
    return undefined;
});
exports.getPonds = getPonds;
const getPond = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from pond as pd where pd.id=${id};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const pond = yield result.rows[0];
        return pond;
    }
    return undefined;
});
exports.getPond = getPond;
const updatePond = (id, pond) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `UPDATE pond
    SET id_equipment = ${pond.id_equipment},
        id_microalgae_state = ${pond.id_microalgae_state},
        microalgae_name = '${pond.microalgae_name}',
        inoculation_date = '${pond.inoculation_date}',
        harvest_date = '${pond.harvest_date}',
        min_NTU = ${pond.min_NTU},
        max_NTU = ${pond.max_NTU}
    WHERE id = ${id};
    `;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.updatePond = updatePond;
const addPond = (pondNew) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO pond (id_equipment, id_microalgae_state, microalgae_name, inoculation_date, harvest_date, min_NTU, max_NTU) 
    VALUES (${pondNew.id_equipment},${pondNew.id_microalgae_state} , '${pondNew.microalgae_name}', '${pondNew.inoculation_date}', NULL, ${pondNew.min_NTU}, ${pondNew.max_NTU});
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
exports.addPond = addPond;
const deletePond = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ` DELETE FROM pond WHERE id = ${id};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deletePond = deletePond;
