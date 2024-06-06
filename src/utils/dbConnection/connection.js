"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conectionString = `mongodb+srv://${process.env.DB_HOST}/${process.env.DB_NAME}`;
exports.connection = mongoose_1.default.connect(conectionString, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
});
// mongoose.set('debug', true);
