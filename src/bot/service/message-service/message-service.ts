import { getMessage } from "./message-list";
import { MessageName } from "./model/message-name";

export class MessageService{
    public static getMessage(name:MessageName){
        return getMessage(name)
    } 
}