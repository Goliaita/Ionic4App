import {Module} from './Module';
import {Room} from './Room';
import {RoomEquipment} from './RoomEquipment';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';
import { CalendarDate } from './CalendarDate';

export interface Calendar {
  date?: Date;
  module?: Module;
  room?: Room;
  calendarDate?: CalendarDate;
  calendarId?: number;
  day?: string;
  roomEquipment?: Array<RoomEquipment>;
  meanRate?: number;
}
