"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = __importDefault(require("./classes/server"));
const router_1 = __importDefault(require("./routes/router"));
const server = server_1.default.instance;
//body parser {funciona para obtener los datos del server y castearlos a json}
//NOTA: es importante ponerlo entes de las rutas
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//CORS
server.app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
//server.app.use( cors({origin: true, credentials: true}));
//rutas de servicio
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`servidor corriendo en ${server.port}`);
});
