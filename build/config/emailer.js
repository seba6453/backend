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
exports.sendMail = void 0;
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const Emails_1 = require("./Emails");
const mailgunAuth = {
    auth: {
        api_key: process.env.apikey_mailgun,
        domain: process.env.domain_mailgun,
    },
};
//config smtp
const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));
const sendMail = ({ users, typeMsg }) => __awaiter(void 0, void 0, void 0, function* () {
    //const transporter = createTransporter()
    try {
        let msg = 'Error TYM';
        switch (typeMsg) {
            case 'error':
                msg = Emails_1.EmailError;
                break;
            case 'info':
                msg = Emails_1.EmailInfo;
                break;
            case 'warning':
                msg = Emails_1.EmailWarning;
                break;
            case 'completed':
                msg = Emails_1.EmailCompleted;
        }
        //test replace smtpTransport to transporter
        const info = yield smtpTransport.sendMail({
            from: '"Angelo" <noreplytestAngelo@exa.com>',
            to: users,
            subject: 'Hi',
            html: msg,
        });
        console.log('message sent', info.messageId);
        return;
    }
    catch (err) {
        console.log(err);
    }
});
exports.sendMail = sendMail;
