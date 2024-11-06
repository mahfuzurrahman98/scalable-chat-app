import { Server } from "socket.io";
import { pub, sub } from "../redis";

class SocketService {
    private _wsServer: Server;

    constructor() {
        console.log("Init Socket Service...");
        this._wsServer = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        sub.subscribe("MESSAGES");
    }

    public initListeners() {
        const wsServer = this.wsServer;
        console.log("Init Socket Listeners...");

        wsServer.on("connect", (wsClient) => {
            console.log(`New Socket Connected`, wsClient.id);
            wsClient.on(
                "event:message",
                async ({ message }: { message: string }) => {
                    console.log("New Message Rec.", message);
                    // publish this message to redis
                    await pub.publish("MESSAGES", JSON.stringify({ message }));
                }
            );
        });

        sub.on("message", (channel, message) => {
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

export default SocketService;
