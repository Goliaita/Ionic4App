import {Module} from './Module';
import {Room} from './Room';
import {RoomEquipment} from './RoomEquipment';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';

export interface Calendar {
  date?: Date;
  module?: Module;
  room?: Room;
  calendarId?: number;
  startTime?: string;
  endTime?: string;
  day?: string;
  startDate?: string;
  endDate?: string;
  roomEquipment?: Array<RoomEquipment>;
  type?: string;
}
