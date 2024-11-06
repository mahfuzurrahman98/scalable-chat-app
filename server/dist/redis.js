"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sub = exports.pub = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const pub = new ioredis_1.default({
    host: "",
    port: 0,
    username: "",
    password: "",
});
exports.pub = pub;
const sub = new ioredis_1.default({
    host: "",
    port: 0,
    username: "",
    password: "",
});
exports.sub = sub;
