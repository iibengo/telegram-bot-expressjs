import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { userCommandList } from "../../commands";
import { eventList } from "../../events";
export class BotServiceManager {
  public static loadComands(bot: Telegraf<Context<Update>>) {
    bot.start((ctx) => {
      ctx.reply(`Hola ${ctx.from.first_name}! 👋 Bienvenido al bot`);
    });
    userCommandList.map((command) => command.function(bot));
  }
  public static async loadEvents(bot: Telegraf<Context<Update>>) {
    eventList.map((event) => event.function(bot));
  }
}
