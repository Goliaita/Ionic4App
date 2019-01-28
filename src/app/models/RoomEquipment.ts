import {Room} from "./Room";
import {Equipments} from "./Equipments";

export interface RoomEquipment {
  room: Room;
  equipment: Equipments;
  issue?: string;
  work?: number;

}
