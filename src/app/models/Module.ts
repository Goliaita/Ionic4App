import {Course} from "./Course";
import {Professor} from "./Professor";

export interface Module {
  moduleId?: number;
  title: string;
  credits?: number;
  semester?: number;
  year?: number;
  course?: Course;
  professor?: Professor;
  creditHour?: number;
  leftHours?: number;
}
