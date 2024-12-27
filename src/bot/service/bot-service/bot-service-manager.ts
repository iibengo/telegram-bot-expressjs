import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { userCommandList } from "../../commands";
import { eventList } from "../../events";
import { BotSessionContext } from "../../model";
export class BotServiceManager {
  public static loadComands(bot: Telegraf<BotSessionContext>) {
    userCommandList.map((command) => command.function(bot));
  }
  public static async loadEvents(bot: Telegraf<BotSessionContext>) {
    eventList.map((event) => event.function(bot));
  }
}
