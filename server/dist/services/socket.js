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
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const redis_1 = require("../redis");
class SocketService {
    constructor() {
        console.log("Init Socket Service...");
        this._wsServer = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        redis_1.sub.subscribe("MESSAGES");
    }
    initListeners() {
        const wsServer = this.wsServer;
        console.log("Init Socket Listeners...");
        wsServer.on("connect", (wsClient) => {
            console.log(`New Socket Connected`, wsClient.id);
            wsClient.on("event:message", (_a) => __awaiter(this, [_a], void 0, function* ({ message }) {
                console.log("New Message Rec.", message);
                // publish this message to redis
                yield redis_1.pub.publish("MESSAGES", JSON.stringify({ message }));
            }));
        });
        redis_1.sub.on("message", (channel, message) => {
            if (channel === "MESSAGES") {
                console.log("new message from redis", message);
                wsServer.emit("message", message);
            }
        });
    }
    get wsServer() {
        return this._wsServer;
    }
}
exports.default = SocketService;
