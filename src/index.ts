import { botService } from "./bot";
import app from "./server/server";
import { config } from "./config/config";

const bot = botService.bot;
bot.launch().catch((error) => {
  console.error("Error al iniciar el bot:", error);
});
app.listen(config.PORT, () => {
  console.log(
    `🌐 Servidor Express escuchando en http://localhost:${config.PORT}`
  );
});
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
