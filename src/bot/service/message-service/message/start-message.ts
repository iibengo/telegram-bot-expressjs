import { StartMessageModel } from "./model/start-message-model";

export const getStartMessage = (_data?: StartMessageModel) => {
  const data = _data
    ? _data
    : {
        solAmount: 0,
        walletAddres:
          "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D",
        solPrice: 25.3,
        portfolio24hGainPercentage: 3.5,
        solPrice24hGainPercentage: 12,
        tokenHoldingAmount: 5, 
      };
  const message = {
    text: `*Farah Bot* (vBeta-0.1), tu compañero en criptomonedas. 🚀
        
        💼 **Tu billetera**:
        - **Saldo**: ${data.solAmount} SOL 💰
        - **Dirección de billetera**: \`${data.walletAddres}\` 🔑
        
        🌍 **Estado del Mercado**:
        - **Precio actual de SOL**: ${data.solAmount} USD 🔥
        - **Última tendencia**: 📈 +${data.portfolio24hGainPercentage}% (últimas 24 horas)
        
        📊 **Resumen de tu portafolio**:
        - **Ganancias/Pérdidas**: ${data.solPrice24hGainPercentage}% ✅
        - **Tokens en cartera**:  ${data.tokenHoldingAmount} activos diferentes.
        
        🔧 Usa el comando /help para ver todas las opciones disponibles.
        
        📈 Puedes explorar tu portafolio completo con el comando: /portafolio
        
        👇 *Elige una acción para continuar*:
        `,
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💸 Comprar", callback_data: "buy_sol" },
          { text: "💰 Vender", callback_data: "sell_sol" },
        ],
        [
          { text: "📊 Posiciones abiertas", callback_data: "view_positions" },
          { text: "📂 Ver portafolio", callback_data: "view_portfolio" },
        ],
        [
          { text: "🔍 Sniffer (Explorar mercado)", callback_data: "sniffer" },
          {
            text: "🤖 AutoTrade (Automatización)",
            callback_data: "autotrade",
          },
        ],
        [
          { text: "➕ Agregar Billetera", callback_data: "add_wallet" },
          { text: "⚙️ Configuraciones", callback_data: "settings" },
        ],
        [{ text: "🌐 Ver Ayuda", callback_data: "help" }],
      ],
    },
  };

  return message;
};
