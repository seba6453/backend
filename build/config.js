"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
require("moment-timezone");
moment_1.default.tz.setDefault('America/Santiago');
const config = {
    date: (0, moment_1.default)().format('YYYY-MM-DD'),
    time: (0, moment_1.default)().format('HH:mm:ss')
};
exports.default = config;
