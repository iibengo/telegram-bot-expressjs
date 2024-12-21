import { MessageName } from "./model/message-name";

const messageNameToMessageMap = new Map<MessageName, string>([
  [
    MessageName.HELP,
    "Estos son los comandos disponibles:\n/start - Menu principal\n/help - Ayuda\n/status - Estado del servidor\n/quote - Cotización",
  ],
  [
    MessageName.START,
    `Hola {0}! 👋 Bienvenido al bot \nVer /help para ayuda`,
  ],
]);
export const getMessage = (name: MessageName) => {
  return messageNameToMessageMap.get(name) || "";
};
