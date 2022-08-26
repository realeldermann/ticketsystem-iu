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
exports.checkSession = void 0;
const Session_schema_1 = __importDefault(require("../../db/schemas/Session.schema"));
function checkSession(sessionToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield Session_schema_1.default.findOne({ token: sessionToken }).populate('user');
        if (session && session.expires && session.expires.getTime() < Date.now()) {
            yield Session_schema_1.default.deleteOne({ _id: session._id });
            return null;
        }
        else
            return session;
    });
}
exports.checkSession = checkSession;
