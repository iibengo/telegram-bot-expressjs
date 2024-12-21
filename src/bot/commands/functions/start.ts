import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { MessageService, MessageName } from "../../service/message-service";

export const start = (bot: Telegraf<Context<Update>>) =>
  bot.start((ctx) => {
    const name = ctx.from.first_name;
    ctx.reply(
      MessageService.getMessage(MessageName.START).replace("{0}", name)
    );
  });
