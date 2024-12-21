import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { config } from "../../../config/config";
import { EventName } from "../model";

export const text = (bot: Telegraf<Context<Update>>) =>
  bot.on(EventName.TEXT, (ctx) => {
    if (ctx.from.id !== config.ADMIN_USER_ID) return;
   // ctx.reply(`Mensaje de Admin: ${ctx.message.text}`);
  });
