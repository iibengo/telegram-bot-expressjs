import { Context, NarrowedContext, Telegraf } from "telegraf";

import { Message, Update } from "telegraf/typings/core/types/typegram";

 interface BotSessionModel {
    flow?:string
    step?: number;
    messageId?:number;
    data?: {
      amount?: string;
      inputMint?: string;
      outputMint?: string;
    };
  }
   
  export interface BotSessionContext extends Context {
    session: BotSessionModel;
  }
  
  // Tipo de contexto para el bot, con la sesión añadida
  export type BotContext = NarrowedContext<
  BotSessionContext,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >;
 