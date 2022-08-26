"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApi = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("config"));
let TicketController = require("./ticket/TicketController");
let ErrorHandler = require("./error/ErrorHandler");
const app = (0, express_1.default)();
const port = config_1.default.get("api.port");
const host = config_1.default.get("api.host");
function startApi() {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.get('/', (req, res, err) => {
        res.send('Ticketsystem API');
    });
    app.listen(port, host, () => {
        console.log(`API runs on http://${host}:${port}`);
    });
    app.use(ErrorHandler);
    app.use(TicketController);
}
exports.startApi = startApi;
