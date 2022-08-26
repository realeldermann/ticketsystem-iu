"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Ticket_schema_1 = __importDefault(require("../../db/schemas/Ticket.schema"));
let ErrorHandler = require('../error/ErrorHandler');
const router = express_1.default.Router();
router.get('/tickets', (req, res) => {
    Ticket_schema_1.default.find({}, (_err, ticket) => {
        res.send(ticket);
    });
});
router.post('/tickets', (req, res) => {
    var ticket = new Ticket_schema_1.default(req.body);
    ticket.save((err) => {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    });
});
module.exports = router;
