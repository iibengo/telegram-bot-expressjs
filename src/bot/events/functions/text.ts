import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { config } from "../../../config/config";
import { EventName } from "../model";
import { handleActiveFlow } from "../../handlers/sessionHandler";
import { BotContext } from "../../model";

export const text = (bot: Telegraf<Context<Update>>) =>
  bot.on(EventName.TEXT, async (ctx) => {
    if (ctx.from.id !== config.TELEGRAM_ADMIN_USER_ID) return;

    await handleActiveFlow(ctx as BotContext);
  });
