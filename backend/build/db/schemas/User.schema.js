"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    passwordHash: String,
    passwordSalt: String,
    created: Date
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
