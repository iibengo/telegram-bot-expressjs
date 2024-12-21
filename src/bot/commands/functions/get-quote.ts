import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export const getQuote =  (bot: Telegraf<Context<Update>>) =>
  bot.command("quote", async (ctx) => {
    ctx.reply("get quote");
  });
