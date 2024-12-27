import { Context, session, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { config } from "../../../config/config";
import { BotServiceManager } from "./bot-service-manager";
import { BotSessionContext } from "../../model";

class BotService {
  private _bot: Telegraf<BotSessionContext>;
  constructor() {
    this._bot = new Telegraf(config.TELEGRAM_BOT_TOKEN) as Telegraf<BotSessionContext>;
    this.loadBotConfig();
  }
  private loadBotConfig() {
    this._bot.use(session());
    this.bot.context.session={}
    BotServiceManager.loadComands(this._bot);
    BotServiceManager.loadEvents(this._bot);
  }
  public get bot() {
    return this._bot;
  }
}
const botService = new BotService();
export { botService };
