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
exports.deleteUser = exports.addUser = exports.getUser = exports.getUsers = void 0;
const dataBase_1 = require("../dataBase");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from user_data;`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const users = yield result.rows;
        return users;
    }
    return undefined;
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from user_data as ud where ud.id=${id};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const userData = yield result.rows[0];
        return userData;
    }
    return undefined;
});
exports.getUser = getUser;
const addUser = (userNew) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT insert_user('${userNew.name}', '${userNew.email}');`;
    try {
        const result = yield dataBase_1.client.query(query);
        return result.rows[0].id;
    }
    catch (err) {
        console.error(err);
        return -1;
    }
});
exports.addUser = addUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT delete_user(${id});`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deleteUser = deleteUser;
