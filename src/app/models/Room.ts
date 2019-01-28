import {Equipments} from "./Equipments";

export interface Room {
  roomId?: number;
  name: string;
  capacity: number;
  location: string;
  equipments?: Array<Equipments>;
}
