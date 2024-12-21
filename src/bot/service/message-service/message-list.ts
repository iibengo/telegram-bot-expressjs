import { MessageName } from "./model/message-name";

const messageNameToMessageMap = new Map<MessageName, string>([
  [
    MessageName.HELP,
    "Estos son los comandos disponibles:\n/start - Inicia el bot\n/help - Ayuda",
  ],
]);
export const getMessage = (name: MessageName) => {
  return messageNameToMessageMap.get(name) || "";
};
