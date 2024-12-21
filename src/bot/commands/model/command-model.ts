import { CommandName } from "./command-name";

export interface CommandModel {
  command: CommandName;
  function: Function;
}
