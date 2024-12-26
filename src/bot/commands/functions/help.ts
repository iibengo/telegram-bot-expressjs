import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { MessageService,MessageName} from "../../service/message-service";


export const help =(bot: Telegraf<Context<Update>>)=>bot.command('help', (ctx) => {
    ctx.reply(MessageService.getMessage(MessageName.HELP).text);
  });
  