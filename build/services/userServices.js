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
exports.getUser = void 0;
const dataBase_1 = require("../dataBase");
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from user_data ud where ud.email = lower('${email}')`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const userData = yield result.rows[0];
        return userData;
    }
    return undefined;
});
exports.getUser = getUser;
