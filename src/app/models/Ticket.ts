import {Professor} from "./Professor";
import {Room} from "./Room";
import {Secretary} from "./Secretary";

export interface Ticket {
  ticketId?: number;
  title?: string;
  professor?: Professor;
  room?: Room;
  secretary?: Secretary;
  date?: Date;
  status: string;
  comment?: string;
  lastModified?: Date;
}
