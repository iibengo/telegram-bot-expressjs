import { getStartMessage } from "./message";
import { MessageName } from "./model/message-name";

// Tipo para almacenar mensaje y botones
type MessageWithButtons = {
  text: string;
  reply_markup?: object; // Puede ser undefined si no hay botones
};

const messageNameToMessageMap = new Map<MessageName, MessageWithButtons>([
  [
    MessageName.HELP,
    {
      text: `🌟 Comandos del bot 🌟
Estos son los comandos que puedes utilizar:

📋 Comandos principales:
/start - Accede al menú principal para comenzar.
/help - Muestra la sección de ayuda con información.

💱 Funciones :
/quote - Inicia el flujo para obtener una cotización
/swap - Inicia el flujo para intercambiar tokens 

⚙️ Herramientas y configuraciones:
/status - Consulta el estado actual del servidor.
/settings - Configuración 

⚠️ Nota: Responde a los mensajes del bot siguiendo las instrucciones para avanzar en cada flujo.`,
      reply_markup: {},
    },
  ],
  [MessageName.START, getStartMessage()],
]);

export const getMessage = (name: MessageName) => {
  return messageNameToMessageMap.get(name) || { text: "" }; // Devolver solo el texto por defecto si no se encuentra el mensaje
};
