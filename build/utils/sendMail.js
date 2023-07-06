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
exports.sendMail_utils = void 0;
const emailer_1 = require("../config/emailer");
const userServices_1 = require("../services/userServices");
const sendMail_utils = ({ typeMsg, res }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userServices_1.getUsers)();
        const mails = [];
        users === null || users === void 0 ? void 0 : users.map((user) => {
            mails.push(user.email);
        });
        //const mails = ['angelo.berrios@alumnos.ucn.cl']
        if (mails.length < 1) {
            res.status(400).send({ message: 'No existen correos' });
        }
        yield (0, emailer_1.sendMail)({ users: mails, typeMsg });
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.sendMail_utils = sendMail_utils;
