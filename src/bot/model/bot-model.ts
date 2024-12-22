import { Context, NarrowedContext, Telegraf } from "telegraf";

import { Message, Update } from "telegraf/typings/core/types/typegram";

export interface BotSession {
    step?: number;
    data?: {
      amount?: string;
      inputMint?: string;
      outputMint?: string;
    };
  }
  
  // Tipo de contexto para el bot, con la sesión añadida
  export type BotQuoteContext = NarrowedContext<
    BotQuoteSession,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >;
  
  export interface BotQuoteSession extends Context {
    session: BotSession;
  }
  