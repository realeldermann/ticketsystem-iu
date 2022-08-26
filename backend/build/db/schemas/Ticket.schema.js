"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    title: String,
    created: Date,
    status: Boolean,
    text: String,
    course: String,
    // user: { type: 'ObjectId', ref: 'User' },
});
const Ticket = (0, mongoose_1.model)('Ticket', ticketSchema);
exports.default = Ticket;
