"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const pond_1 = __importDefault(require("./pond"));
const report_1 = __importDefault(require("./report"));
const equipment_1 = __importDefault(require("./equipment"));
const router = express_1.default.Router();
router.use('/user', user_1.default);
router.use('/pond', pond_1.default);
router.use('/report', report_1.default);
router.use('/equipment', equipment_1.default);
exports.default = router;
