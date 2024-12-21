import { MessageName } from "./model/message-name";

const messageNameToMessageMap = new Map<MessageName, string>([
  [
    MessageName.HELP,
    "Estos son los comandos disponibles:\n/help - Ayuda",
  ],
  [
    MessageName.START,
    `Hola {0}! 👋 Bienvenido al bot`,
  ],
]);
export const getMessage = (name: MessageName) => {
  return messageNameToMessageMap.get(name) || "";
};
