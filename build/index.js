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
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers/routers"));
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json()); //middleware que trasforma la req.body a un json
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors({
    origin: '*'
}));
const PORT = process.env.PORT;
app.get('/ping', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("servidor corriendo");
}));
app.get('/api', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(__dirname + '/html/index.html');
}));
app.use('/api', routers_1.default);
app.listen(PORT, () => {
    console.log('server running on port:', PORT);
});
