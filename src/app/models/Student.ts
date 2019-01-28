import {Person} from "./Person";
import {Course} from "./Course";

export interface Student{
  studentId?: number;
  course: Course;
  person: Person;
  registrationDate: Date;
  graduationDate?: Date;
}
