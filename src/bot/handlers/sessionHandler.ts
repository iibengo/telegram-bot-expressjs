import { BotContext } from "../model";
import { handleQuoteFlow, handleSwapFlow } from "../commands/functions";
// Inicializa el flujo "swap"
export const initializeSwap = async (ctx: BotContext) => {
  ctx.session = {
    flow: "swap",
    step: 1,
    data: {},
  };
  await ctx.reply("*Cantidad* de entrada:", { parse_mode: "Markdown" });
};
export const handleActiveFlow = async (ctx: BotContext) => {
  if (!ctx.session?.flow) {
    return await ctx.reply(
      ""
    );
  }

  switch (ctx.session.flow) {
    case "swap":
      await handleSwapFlow(ctx);
      break;
    case "quote":
      await handleQuoteFlow(ctx);
      break;
    default:
      await ctx.reply(
        "❌ Flujo desconocido. Usa un comando válido para comenzar."
      );
      ctx.session = {}; // Limpia la sesión si el flujo es inválido
      break;
  }
};
