import {Module} from "./Module";
import {Room} from "./Room";
import {RoomEquipment} from "./RoomEquipment";
import { Time } from "@angular/common";

export interface Calendar {
  module?: Module;
  room?: Room;
  calendarId?: number;
  startTime?: Date;
  endTime?: Date;
  date?: Date;
  day?: string;
  startDate?: string;
  endDate?: string;
  roomEquipment?: Array<RoomEquipment>;
  type?: string;
}
