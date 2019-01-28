import {Module} from "./Module";
import {Room} from "./Room";
import {RoomEquipment} from "./RoomEquipment";

export interface LectureCalendar {
  module?: Module;
  room?: Room;
  lectureCalendarId?: number;
  startTime?: string;
  endTime?: string;
  date?: string;
  day?: string;
  startDate?: string;
  endDate?: string;
  roomEquipment?: Array<RoomEquipment>;
  type?: string;
}
