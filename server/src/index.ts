import http from "http";
import SocketService from "./services/socket";

(async function () {
    const socketService = new SocketService();

    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    socketService.wsServer.attach(httpServer);

    httpServer.listen(PORT, () =>
        console.log(`HTTP Server started at PORT:${PORT}`)
    );

    socketService.initListeners();
})();
