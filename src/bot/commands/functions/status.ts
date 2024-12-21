import axios from "axios";
import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { config } from "../../../config/config";

export const status = async (bot: Telegraf<Context<Update>>) =>
  bot.command("status", async (ctx) => {
    try {
      // Realiza una solicitud a tu API
      const response = await axios.get(
        `http://localhost:${config.PORT}/api/status`
      );
      const data = response.data;

      ctx.reply(`${data}`);
    } catch (error) {
      console.error("Error al obtener el estado del servidor:", error);
      ctx.reply("❌ No se pudo obtener el estado del servidor.");
    }
  });
