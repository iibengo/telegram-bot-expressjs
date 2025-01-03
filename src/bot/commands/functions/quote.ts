import { BotContext, BotSessionContext } from "../../model";
import axios from "axios";
import { config } from "../../../config/config";
import { Telegraf } from "telegraf";

export const quote = (bot: Telegraf<BotSessionContext>) => {
  bot.command("quote", async (ctx) => {
    initializeQuote(ctx); 
  });
};
export const initializeQuote = async (ctx: BotContext) => {
  ctx.session = {
    flow: "quote",
    step: 1,
    data: {},
  };
  await ctx.reply("*Cantidad* de  entrada", { parse_mode: "Markdown" });
};
export const handleQuoteFlow = async (ctx: BotContext) => {
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
  await ctx.reply("*Direccion o símbolo* del token de entrada", { parse_mode: "Markdown" });
};
const handleInputTokenStep = async (ctx: BotContext) => {
  const inputMint = ctx.message.text;
  if (!isValidContract(inputMint)) {
    return await ctx.reply(
      "❌ Por favor, escribe un contrato (Mint Address) o símbolo válidos."
    );
  }

  ctx.session.data!.inputMint = inputMint;
  ctx.session.step = 3;
  await ctx.reply("*Direccion o símbolo* del token de salida", { parse_mode: "Markdown" });
};
const handleOutputTokenStep = async (ctx: BotContext) => {
  const outputMint = ctx.message.text;
  if (!isValidContract(outputMint)) {
    return await ctx.reply(
      "❌ Por favor, escribe un contrato (Mint Address)  o símbolo válidos."
    );
  }

  ctx.session.data!.outputMint = outputMint;

  try {
    const quoteData = await fetchQuote(ctx);
    await sendQuoteResponse(ctx, quoteData);
  } catch (error) {
    console.error("Error al obtener la cotización:", error);
    await ctx.reply("❌ No se pudo obtener la cotización.");
  } finally {
    ctx.session = {};
  }
};
const isValidContract = (contract: string): boolean => {
  return contract.length >= 0
};
const fetchQuote = async (ctx: BotContext) => {
  const { amount, inputMint, outputMint } = ctx.session.data!;
  const response = await axios.post(
    `http://localhost:${config.PORT}/api/v1/quote/getQuoteOperation`,
    { amount, inputTokenQuery:inputMint, outputTokenQuery:outputMint }
  );
  return response.data; 
};

const sendQuoteResponse = async (ctx: BotContext, data: any) => {
  if (data.outputAmount) {
    const inputTokenName = data.input.symbol
      ? ` ${data.input.symbol}`
      : "";
    const outputTokenName = data.output.symbol
      ? ` ${data.output.symbol}`
      : "";

    const formattedMessage = `
🌟 *Cotización de Intercambio* 🌟

🔄 *Cantidad de entrada*: 
\`${ctx.session.data!.amount}\`${inputTokenName} (\`${
  data.input.address
    }\`)

💰 *Cantidad de salida*: 
\`${data.outputAmount.toFixed(2)}\`${outputTokenName} (\`${
  data.output.address
    }\`)
    `;

    await ctx.reply(formattedMessage, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❌ No se pudo obtener el precio de intercambio.");
  }
};
