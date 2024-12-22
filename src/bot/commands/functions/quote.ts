import { Telegraf } from "telegraf";
import axios from "axios";
import { config } from "../../../config/config";
import { BotQuoteSession,BotQuoteContext } from "../../model";

// Tipos para las sesiones del bot

// Función principal para manejar las operaciones del bot
export const quote = (bot: Telegraf<BotQuoteSession>) => {
  // Comando "/quote" para iniciar el proceso
  bot.command("quote", async (ctx) => {
    initializeSession(ctx); // Inicializa la sesión
    await ctx.reply("*Cantidad* de entrada:", {
      parse_mode: "Markdown",
    });
  });

  // Manejo de los mensajes de texto según el paso actual
  bot.on("text", async (ctx) => {
    if (!ctx.session.step) return; // Ignora si no hay un flujo activo

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
    }
  });
};

// Inicializa o reinicia la sesión
const initializeSession = (ctx: BotQuoteContext) => {
  ctx.session = {}; // Limpia cualquier información previa
  ctx.session.step = 1; // Establece el primer paso
  ctx.session.data = {}; // Inicializa los datos vacíos
};

// Maneja el paso 1: Captura la cantidad de SOL
const handleAmountStep = async (ctx: BotQuoteContext) => {
  const amount = ctx.message.text;

  // Verifica si la cantidad es válida (debe ser un número)
  if (isNaN(Number(amount))) {
    await ctx.reply("❌ Por favor, escribe una cantidad válida en números.");
    return;
  }

  // Guarda la cantidad y pasa al siguiente paso
  ctx.session.data!.amount = amount;
  ctx.session.step = 2;

  await ctx.reply("*Token* de entrada:", { parse_mode: "Markdown" });
};

// Maneja el paso 2: Captura la dirección del contrato (Mint Address)
const handleInputTokenStep = async (ctx: BotQuoteContext) => {
  const inputMint = ctx.message.text;

  // Verifica si el contrato es válido (función de validación)
  if (!isValidContract(inputMint)) {
    await ctx.reply("❌ Por favor, escribe un contrato (Mint Address) válido.");
    return;
  }

  // Guarda el contrato y pasa al siguiente paso
  ctx.session.data!.inputMint = inputMint;
  ctx.session.step = 3;

  await ctx.reply("*Token* de salida:", { parse_mode: "Markdown" });
};

// Valida la dirección del contrato (Mint Address)
const isValidContract = (contract: string): boolean => {
  return contract.length >= 32 && contract.length <= 44;
};

// Maneja el paso 3: Captura el token de salida (output token)
const handleOutputTokenStep = async (ctx: BotQuoteContext) => {
  const outputMint = ctx.message.text;

  // Verifica si el contrato es válido
  if (!isValidContract(outputMint)) {
    await ctx.reply("❌ Por favor, escribe un contrato (Mint Address) válido.");
    return;
  }

  // Guarda el output token y realiza la consulta de cotización
  ctx.session.data!.outputMint = outputMint;

  try {
    const quoteData = await fetchQuote(ctx);
    await sendQuoteResponse(ctx, quoteData);
  } catch (error) {
    console.error("Error al obtener el precio de Solana:", error);
    await ctx.reply("❌ No se pudo obtener el precio de Solana.");
  } finally {
    // Limpia la sesión después de la operación
    ctx.session = {};
  }
};

// Realiza la consulta a la API de cotización
const fetchQuote = async (ctx: BotQuoteContext) => {
  const { amount, inputMint, outputMint } = ctx.session.data!;
  const response = await axios.post(
    `http://localhost:${config.PORT}/api/quote`,
    {
      amount,
      inputMint,
      outputMint,
    }
  );

  return response.data; // Retorna la respuesta de la API
};

// Envía la respuesta formateada con el precio al usuario
const sendQuoteResponse2 = async (ctx: BotQuoteContext, data: any) => {
  if (data.success && data.data.solPrice) {
    const formattedMessage = `
*Precio de Intercambio*

🔄 Para \`${ctx.session.data!.amount} \`-\`${
      ctx.session.data!.inputMint
    }\`
💰 Precio:\`${data.data.solPrice.toFixed(2)} \`-\`${
      ctx.session.data!.outputMint
    }\`
`;
    await ctx.reply(formattedMessage, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❌ No se pudo obtener el precio de Solana.");
  }
};
const sendQuoteResponse = async (ctx: BotQuoteContext, data: any) => {
  if (data.success && data.data.outputAmount) {
    const inputTokenName = data.data.input.name ? ` ${data.data.input.name}` : "";
    const outputTokenName = data.data.output.name ? ` ${data.data.output.name}` : "";

    const formattedMessage = `
🌟 *Precio de Intercambio* 🌟

🔄 *Cantidad de entrada*: 
\`${ctx.session.data!.amount}\` ${inputTokenName} (\`${ctx.session.data!.inputMint}\`)

💰 *Cantidad de salida*: 
\`${data.data.outputAmount.toFixed(2)}\` ${outputTokenName} (\`${ctx.session.data!.outputMint}\`)
    `;

    await ctx.reply(formattedMessage, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❌ No se pudo obtener el precio de intercambio.");
  }
};