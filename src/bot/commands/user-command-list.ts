import { CommandModel,CommandName } from "./model";
import { help, status,start } from "./functions";

export const userCommandList: CommandModel[] = [
  {
    command: CommandName.START,
    function: start
  },
  {
    command: CommandName.HELP,
    function: help
  },
  {
    command: CommandName.STATUS,
    function: status
  },
];
