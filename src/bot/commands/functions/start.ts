import { Context, Telegraf } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
import { MessageService, MessageName } from "../../service/message-service";
interface BotQuoteSession extends Context {
  session: any;
}

// Configuración del bot
export const start = (bot: Telegraf<BotQuoteSession>) => {

  bot.start(async (ctx) => {
    ctx.session={}
    const name = ctx.from.first_name;
    const messageData = MessageService.getMessage(MessageName.START);

    // Aseguramos que `reply_markup` sea del tipo correcto
    const replyMarkup = messageData.reply_markup as InlineKeyboardMarkup | undefined;

    // Personaliza el texto reemplazando el marcador con el nombre
    const text = messageData.text.replace("{0}", name);

    // Enviar el mensaje inicial y guardar el `message_id`
    const sentMessage = await ctx.reply(text, {
      parse_mode: "Markdown",
      reply_markup: replyMarkup,
    });

    // Guardamos el `message_id` para poder editarlo más tarde en la sesión del usuario
    ctx.session.messageId = sentMessage.message_id;  // Guardamos en la sesión
  });

  // Capturar la acción de "Ver portafolio" cuando el usuario hace clic
  bot.action("view_portfolio", async (ctx) => {
    ctx.session={}
    // Obtener el `message_id` guardado en la sesión
    const messageId = ctx.session.messageId;

    // Aquí puedes obtener la información del portafolio y mostrarla
    const userPortfolio = await getPortfolio(ctx.from.id); // Ejemplo, deberías implementar `getPortfolio`

    // Mensaje mostrando el portafolio
    const portfolioMessage = `📊 **Tu Portafolio**:
- **Saldo en SOL**: ${userPortfolio.solBalance} SOL 💰
- **Valor total en USD**: $${userPortfolio.usdValue}

---

¿Qué más te gustaría hacer?`;

    // Editamos el mensaje original con la información del portafolio
    await ctx.editMessageText(portfolioMessage, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Volver al inicio", callback_data: "back_to_start" }],
        ],
      },
    });
  });

  // Capturar la acción de "Volver al inicio" (por ejemplo, si el usuario quiere volver al menú principal)
  bot.action("back_to_start", async (ctx) => {
    // Obtener el `message_id` guardado en la sesión
    const messageId = ctx.session.messageId;

    // Volver a mostrar el mensaje de inicio
    const name = ctx.from.first_name;
    const messageData = MessageService.getMessage(MessageName.START);
    const replyMarkup = messageData.reply_markup as InlineKeyboardMarkup | undefined;
    const text = messageData.text.replace("{0}", name);

    // Editamos el mensaje original para mostrar el menú de inicio nuevamente
    await ctx.editMessageText(text, {
      parse_mode: "Markdown",
      reply_markup: replyMarkup,
    });
  });
};

async function getPortfolio(userId: number): Promise<any> {
  return {
    solBalance: 10.5, 
    usdValue: 500,    
  };
}
