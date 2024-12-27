import { Telegraf } from "telegraf";
import { BotContext, BotSessionContext } from "../../model";
import axios from "axios";
import { config } from "../../../config/config";

export const swap = (bot: Telegraf<BotSessionContext>) => {
  bot.command("swap", async (ctx) => {
    initializeSwap(ctx);
  });
};
export const initializeSwap = async (ctx: BotContext) => {
  ctx.session = {
    flow: "swap",
    step: 1,
    data: {},
  };
  await ctx.reply("*Cantidad* de entrada:", { parse_mode: "Markdown" });
};

export const handleSwapFlow = async (ctx: BotContext) => {
  switch (ctx.session.step) {
    case 1:
      await handleAmountStep(ctx);
      break;
    case 2:
      await handleInputTokenStep(ctx);
      break;
    case 3:
      await handleOutputTokenStep(ctx);
      break;
    default:
      ctx.session = {};
      break;
  }
};

const handleAmountStep = async (ctx: BotContext) => {
  const amount = ctx.message.text;
  if (isNaN(Number(amount))) {
    return await ctx.reply(
      "❌ Por favor, escribe una cantidad válida en números."
    );
  }
  ctx.session.data!.amount = amount;
  ctx.session.step = 2;
  await ctx.reply("*Token* de entrada:", { parse_mode: "Markdown" });
};

const handleInputTokenStep = async (ctx: BotContext) => {
  const inputMint = ctx.message.text;
  if (!isValidContract(inputMint)) {
    return await ctx.reply(
      "❌ Por favor, escribe un contrato (Mint Address) válido."
    );
  }
  ctx.session.data!.inputMint = inputMint;
  ctx.session.step = 3;
  await ctx.reply("*Token* de salida:", { parse_mode: "Markdown" });
};

const handleOutputTokenStep = async (ctx: BotContext) => {
  const outputMint = ctx.message.text;
  if (!isValidContract(outputMint)) {
    return await ctx.reply(
      "❌ Por favor, escribe un contrato (Mint Address) válido."
    );
  }
  ctx.session.data!.outputMint = outputMint;
  //todo: mandar mensaje a cliente

  await doSwap(ctx)
  await ctx.reply("¡Intercambio completado! 🎉");
};

const isValidContract = (contract: string): boolean => {
  return contract.length >= 0;
};
const doSwap = async (ctx: BotContext) => {
  const { amount, inputMint, outputMint } = ctx.session.data!;
  await ctx.reply(`Iniciando intercambio...`);
  const response = await axios.post(
    `http://localhost:${config.PORT}/api/v1/swap/swapOperation`,
    { amount, inputMint, outputMint }
  );

  return response.data; 
};