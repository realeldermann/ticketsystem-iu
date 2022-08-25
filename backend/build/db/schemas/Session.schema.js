"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    token: String,
    created: Date,
    expires: Date,
    user: { type: 'ObjectId', ref: 'User' },
});
const Session = (0, mongoose_1.model)('Session', sessionSchema);
exports.default = Session;
