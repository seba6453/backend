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
exports.getState = exports.deletePond = exports.addPond = exports.updatePond = exports.getPond = exports.getPonds = void 0;
const dataBase_1 = require("../dataBase");
const config_1 = __importDefault(require("../config"));
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
    VALUES (${pondNew.id_equipment},${pondNew.id_microalgae_state} , '${pondNew.microalgae_name}', '${config_1.default.date}', NULL, ${pondNew.min_NTU}, ${pondNew.max_NTU});
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
const getState = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT *
    FROM (
        SELECT p.id, ms.state_name, p.min_ntu, p.max_ntu, r.illumination, r.ntu, r.id as id_report
        FROM pond p
        INNER JOIN report r ON p.id = r.pond_id
        INNER JOIN microalgae_state ms ON p.id_microalgae_state = ms.id
        WHERE p.id = ${id}
        AND r.date = (
            SELECT MAX(date)
            FROM report
            WHERE pond_id = p.id
        )
    ) subquery
    ORDER BY subquery.id_report DESC
    LIMIT 1;`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const statePond = yield result.rows[0];
        return statePond;
    }
    return undefined;
});
exports.getState = getState;
