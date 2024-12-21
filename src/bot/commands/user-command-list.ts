import { CommandModel,CommandName } from "./model";
import { help, status } from "./functions";

export const userCommandList: CommandModel[] = [
  {
    command: CommandName.HELP,
    function: help
  },
  {
    command: CommandName.STATUS,
    function: status
  },
];
