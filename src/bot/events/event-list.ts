import { EventModel, EventName } from "./model";
import { text } from "./functions";

export const eventList: EventModel[] = [
  {
    name: EventName.TEXT,
    function: text,
  },
];
