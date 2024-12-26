import { botService } from "./bot";
import { config } from "./config/config";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { ExpressServer } from "./server/server";

const server = new ExpressServer();
const httpServer = new HttpServer(server.app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log(`🟢 Cliente conectado: ${socket.id}`);

  socket.on("buyEvent", (data) => {
    console.log("📩 Evento de compra recibido:", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});

const bot = botService.bot;
bot.launch().catch((error) => {
  console.error("Error al iniciar el bot:", error);
});

httpServer.listen(config.PORT, () => {
  console.log(
    `🌐 Servidor Express y Socket.IO escuchando en http://localhost:${config.PORT}`
  );
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
