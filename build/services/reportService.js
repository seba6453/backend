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
exports.deleteReport = exports.addReport = exports.updateReport = exports.getReport = exports.getReports = void 0;
const dataBase_1 = require("../dataBase");
const getReports = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from report;`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const reports = result.rows;
        return reports;
    }
    return undefined;
});
exports.getReports = getReports;
const getReport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from report as rp where rp.id=${id};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const report = yield result.rows[0];
        return report;
    }
    return undefined;
});
exports.getReport = getReport;
const updateReport = (id, reportUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `UPDATE report
    SET pond_id = ${reportUpdate.pond_id},
        date = '${reportUpdate.date}',
        time = '${reportUpdate.time}',
        illumination = ${reportUpdate.illumination},
        NTU = ${reportUpdate.NTU}
    WHERE id = ${id};
    `;
    const result = yield dataBase_1.client.query(query);
    console.log(result);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.updateReport = updateReport;
const addReport = (reportNew) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO report (pond_id, date, time, illumination, NTU)
    VALUES (${reportNew.pond_id}, '${reportNew.date}', '${reportNew.time}', ${reportNew.illumination}, ${reportNew.NTU});
    
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
exports.addReport = addReport;
const deleteReport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ` DELETE FROM report WHERE id = ${id};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deleteReport = deleteReport;
