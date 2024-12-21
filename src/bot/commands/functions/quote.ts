import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import axios from "axios";
import { config } from "../../../config/config";

export const quote = (bot: Telegraf<Context<Update>>) =>
  bot.command("quote", async (ctx) => {
    try {
      const response = await axios.get(
        `http://localhost:${config.PORT}/api/quote`
      );

      const data = response.data.data;
      console.log(data, response.data.success, data.solPrice);
      if (response.data.success && data.solPrice) {
        const formattedMessage = `
🌟 *Precio Actual de Solana (SOL)* 🌟

💰 1 SOL = \`${data.solPrice.toFixed(2)} USDC\`
        `;
        ctx.reply(formattedMessage, { parse_mode: "Markdown" });
      } else {
        ctx.reply("❌ No se pudo obtener el precio de Solana.");
      }
    } catch (error) {
      console.error("Error al obtener el precio de Solana:", error);
      ctx.reply("❌ No se pudo obtener el precio de Solana.");
    }
  });
